from email import message
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

@app.route("/register-farmer", methods=['GET'])
def register_farmer():
    # Create a new queue in RabbitMQ
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='127.0.0.1'))
    channel = connection.channel()
    channel.exchange_declare(exchange="farmer_" + request.args.get('farmer-id'), exchange_type='fanout')
    connection.close()
    return "<p>New farmer registered</p>"

@app.route("/subscribe", methods=['GET'])
def subscribe():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    channel.queue_bind(exchange="farmer_" + request.args.get('farmer-id'), queue="user_" + request.args.get('user-id'))
    connection.close()
    return "<p>New subscription registered</p>"

@app.route("/publish", methods=['GET'])
def publish():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    message = request.args.get('message')
    channel.basic_publish(exchange="farmer_" + request.args.get('farmer-id'),
                      routing_key='',
                      body=message,
                      properties=pika.BasicProperties(
                        delivery_mode = pika.spec.PERSISTENT_DELIVERY_MODE))
    print(" [x] Sent %r" % message)
    connection.close()
    return "<p>New message published</p>"

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