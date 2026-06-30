import pika 
import json

def callback(
    ch,
    method,
    properties,
    body
):

    data = json.loads(body)

    print("Received Job:")
    print(data)

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

channel.basic_consume(

    queue="resume_queue",

    on_message_callback=callback,

    auto_ack=True
)

print("Waiting for jobs...")

channel.start_consuming()