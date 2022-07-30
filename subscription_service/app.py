from flask import Flask
from flask import request
from threading import Timer
import _thread
import pika

app = Flask(__name__)

def callback(messages, ch, method, properties, body):
    print(" [x] %r" % body)
    messages.append(body)
    print(messages)
    if messages[0] == 1:
        ch.stop_consuming()
    messages[0] -= 1

@app.route("/register-queue", methods=['GET'])
def register_queue():
    # Create a new queue in RabbitMQ
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()
    channel.queue_declare(queue="user_" + request.args.get('user-id'), exclusive=False, durable=True)
    connection.close()
    return "<p>New queue registered</p>"
"""
@app.route("/subscribe" methods=['GET'])
def subscribe():
"""

@app.route("/retrieve-messages", methods=['GET'])
def retrieve_messages():
    # Retrieve messages from farmers
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()
    queue_name = "user_" + request.args.get('user-id')
    queue = channel.queue_declare(queue=queue_name, exclusive=False, durable=True)
    messages = [queue.method.message_count]
    if messages[0] > 0:
        channel.basic_consume(
            queue=queue_name,
            on_message_callback=lambda *args, **kwargs: callback(messages, *args, **kwargs), 
            auto_ack=True)
        channel.start_consuming()
    connection.close()
    return "<p>All messages retrieved, see the log</p>"