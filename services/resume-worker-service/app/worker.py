import json
import time

import pika

from app.db import Base, SessionLocal, engine
from app.models import Notification, ResumeAnalysis
from app.gemini_service import analyze_resume


def add_resume_notification(db, row, completed):
    event_status = "completed" if completed else "failed"
    event_key = "resume-analysis:" + str(row.id) + ":" + event_status
    existing = (
        db.query(Notification)
        .filter(
            Notification.user_email == row.user_email,
            Notification.event_key == event_key,
        )
        .first()
    )
    if existing:
        return

    if completed:
        title = "Resume analysis complete"
        description = "Resume analysis #" + str(row.id) + " completed with an ATS score of " + str(row.ats_score) + "."
        notification_type = "success"
    else:
        title = "Resume analysis failed"
        description = "Resume analysis #" + str(row.id) + " could not be completed. Please try uploading it again."
        notification_type = "warning"

    db.add(Notification(
        user_email=row.user_email,
        event_key=event_key,
        title=title,
        description=description,
        type=notification_type,
        unread=True,
    ))


for attempt in range(10):
    try:
        Base.metadata.create_all(bind=engine)
        print("Resume worker tables ready")
        break
    except Exception as exc:
        if attempt == 9:
            raise
        print("Database not ready for resume worker:", exc)
        time.sleep(2)


def callback(ch, method, properties, body):

    db = SessionLocal()

    try:
        data = json.loads(body)

        print(f"Received Job {data['analysis_id']}")

        result = analyze_resume(data["resume_text"])

        row = (
            db.query(ResumeAnalysis)
            .filter(ResumeAnalysis.id == data["analysis_id"])
            .first()
        )

        if row is None:
            print("Analysis record not found")
            ch.basic_ack(delivery_tag=method.delivery_tag)
            return

        row.analysis = result["analysis"]
        row.ats_score = result["ats_score"]
        row.status = "completed"
        add_resume_notification(db, row, completed=True)

        db.commit()

        print(f"Completed Job {row.id}")

        ch.basic_ack(delivery_tag=method.delivery_tag)

    except Exception as e:

        print("Worker Error:", e)

        db.rollback()

        try:
            row = (
                db.query(ResumeAnalysis)
                .filter(ResumeAnalysis.id == data["analysis_id"])
                .first()
            )

            if row:
                row.status = "failed"
                add_resume_notification(db, row, completed=False)
                db.commit()

        except Exception:
            pass

        ch.basic_ack(delivery_tag=method.delivery_tag)

    finally:
        db.close()


credentials = pika.PlainCredentials(
    "admin",
    "admin"
)

while True:

    try:

        connection = pika.BlockingConnection(
            pika.ConnectionParameters(
                host="rabbitmq",
                port=5672,
                credentials=credentials
            )
        )

        print("Connected to RabbitMQ")

        break

    except pika.exceptions.AMQPConnectionError:

        print("Waiting for RabbitMQ...")

        time.sleep(5)


channel = connection.channel()

channel.queue_declare(
    queue="resume_queue",
    durable=True
)

channel.basic_consume(
    queue="resume_queue",
    on_message_callback=callback,
    auto_ack=False
)

print("Waiting for jobs...")

channel.start_consuming()