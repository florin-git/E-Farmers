# from email import message
from flask import Flask
from flask import request
from flask_restful import Resource, Api
import pika
import json
import environ
# For managing the environment variables
env = environ.Env()
environ.Env.read_env()

# Use this when containerized
rabbitmq_service_addr = env('RABBITMQ_SERVICE')

app = Flask(__name__)
api = Api(app)

def callback(messages, ch, method, properties, body):
    message = body.decode()
    messages.append(message)
    if messages[0] == 1:
        ch.stop_consuming()
    messages[0] -= 1

class Queue(Resource):
    def put(self, user_id):
        # Creates a new binding between a queue and an exchange
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_service_addr))
        channel = connection.channel()
        queue_name = "user_" + user_id
        exchange_name = "farmer_" + request.get_json()['farmer_id']
        channel.queue_declare(queue=queue_name, exclusive=False, durable=True)
        channel.exchange_declare(exchange=exchange_name, exchange_type='fanout')
        channel.queue_bind(exchange=exchange_name, queue=queue_name)
        connection.close()
        return '', 200
    def patch(self, user_id):
        # Delete a binding
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_service_addr))
        channel = connection.channel()
        queue_name = "user_" + user_id
        exchange_name = "farmer_" + request.get_json()['farmer_id']
        channel.queue_declare(queue=queue_name, exclusive=False, durable=True)
        channel.exchange_declare(exchange=exchange_name, exchange_type='fanout')
        channel.queue_unbind(exchange=exchange_name, queue=queue_name)
        connection.close()
        return '', 200
    def get(self, user_id):
        # Reads all the messages in the queue
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_service_addr))
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
    def delete(self, user_id):
        # Deletes the queue
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_service_addr))
        channel = connection.channel()
        channel.queue_delete(queue="user_" + user_id)
        connection.close()
        return '', 200

class Exchange(Resource):
    def post(self, farmer_id):
        # Delivers a message to the exchange
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_service_addr))
        channel = connection.channel()
        exchange_name = "farmer_" + farmer_id
        message = request.get_json()['message']
        channel.exchange_declare(exchange=exchange_name, exchange_type='fanout')
        channel.basic_publish(exchange=exchange_name,
                        routing_key='',
                        body=message,
                        properties=pika.BasicProperties(
                            delivery_mode = pika.spec.PERSISTENT_DELIVERY_MODE))
        connection.close()
        return '', 200
    def delete(self, farmer_id):
        # Deletes the exchange
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_service_addr))
        channel = connection.channel()
        channel.exchange_delete(exchange="farmer_" + farmer_id, if_unused=False)
        connection.close()
        return '', 200

api.add_resource(Queue, '/customer/', '/customer/<string:user_id>/')
api.add_resource(Exchange, '/farmer/', '/farmer/<string:farmer_id>/')

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
