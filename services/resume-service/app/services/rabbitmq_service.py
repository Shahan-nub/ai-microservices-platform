import pika

import json

def publish_resume_job(data):

    credentials = pika.PlainCredentials(
    "admin",
    "admin"
    )

    connection = pika.BlockingConnection(
        pika.ConnectionParameters(
            host="rabbitmq",
            credentials=credentials
        )
    )

    channel = connection.channel()

    channel.queue_declare(
        queue="resume_queue",
        durable=True
    )

    channel.basic_publish(

        exchange="",

        routing_key="resume_queue",

        body=json.dumps(data)
    )

    connection.close()