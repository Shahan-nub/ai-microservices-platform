import json
import time

import pika

from app.db import SessionLocal
from app.models import ResumeAnalysis
from app.gemini_service import analyze_resume


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