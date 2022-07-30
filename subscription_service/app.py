# from email import message
from flask import Flask
from flask import request
from flask_restful import Resource, Api
from threading import Timer
import _thread
import pika
import json

app = Flask(__name__)
api = Api(app)

def callback(messages, ch, method, properties, body):
    message = body.decode()
    messages.append(message)
    if messages[0] == 1:
        ch.stop_consuming()
    messages[0] -= 1

class Queue(Resource):
    def put(self):
        # Create a new queue in RabbitMQ
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='127.0.0.1'))
        channel = connection.channel()
        queue = channel.queue_declare(queue="user_" + request.form['user_id'], exclusive=False, durable=True)
        print(queue)
        connection.close()   
        return 201
    def patch(self, user_id):
        # Create a new binding between a queue and an exchange
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='127.0.0.1'))
        channel = connection.channel()
        channel.queue_bind(exchange="farmer_" + request.form['farmer_id'], queue="user_" + user_id)
        connection.close()
        return 200
    def get(self, user_id):
        # Read all the messages in the queue
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='127.0.0.1'))
        channel = connection.channel()
        queue_name = "user_" + user_id
        queue = channel.queue_declare(queue=queue_name, exclusive=False, durable=True)
        messages = [queue.method.message_count]
        if messages[0] > 0:
            channel.basic_consume(
                queue=queue_name,
                on_message_callback=lambda *args, **kwargs: callback(messages, *args, **kwargs), 
                auto_ack=True)
            channel.start_consuming()
        connection.close()
        return json.dumps(messages[1:])

class Exchange(Resource):
    def put(self):
        # Create a new exchange in RabbitMQ
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='127.0.0.1'))
        channel = connection.channel()
        channel.exchange_declare(exchange="farmer_" + request.form['farmer_id'], exchange_type='fanout')
        connection.close()
        return 201
    def post(self, farmer_id):
        # Deliver a message to the exchange
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='127.0.0.1'))
        channel = connection.channel()
        message = request.form['message']
        channel.basic_publish(exchange="farmer_" + farmer_id,
                        routing_key='',
                        body=message,
                        properties=pika.BasicProperties(
                            delivery_mode = pika.spec.PERSISTENT_DELIVERY_MODE))
        connection.close()
        return 200

api.add_resource(Queue, '/customer', '/customer/<string:user_id>')
api.add_resource(Exchange, '/farmer', '/farmer/<string:farmer_id>')

if __name__ == '__main__':
    app.run(debug=False)
