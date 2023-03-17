# from email import message
from flask import (
    request, Blueprint, flash, jsonify
)
from flask_restful import Resource
from subscription_api.db import get_db
import pika
import environ
# For managing the environment variables
env = environ.Env()
environ.Env.read_env()

# Use this when containerized
rabbitmq_service_addr = env('RABBITMQ_SERVICE')

# Create a blueprint to be registered to the app
bp = Blueprint('api', __name__)

@bp.route('/customer/<string:user_id>/subscriptions/')
def get_subscriptions(user_id):
    # Returns the id of the farmers a user is subscribed to
    db = get_db()
    queue_name = "user_" + user_id
    cursor = db.cursor()
    cursor.execute(f"SELECT * FROM subscription WHERE customer LIKE '{queue_name}'")
    res = cursor.fetchone()
    if res != None:
        subscriptions = []
        while res != None:
            cur_res = int(res[2].split('_')[1])
            subscriptions.append(cur_res)
            res = cursor.fetchone()
        return jsonify(subscriptions)
    else:
        return 'No subscription for this user', 204

def callback(messages, ch, method, properties, body):
    message = body.decode()
    messages.append(message)
    if messages[0] == 1:
        ch.stop_consuming()
    messages[0] -= 1

class Queue(Resource):
    def put(self, user_id):
        error = None
        db = get_db()
        # Creates a new binding between a queue and an exchange
        queue_name = "user_" + user_id
        exchange_name = "farmer_" + request.get_json()['farmer_id']
        cursor = db.cursor()
        cursor.execute(f"SELECT count(*) FROM subscription WHERE customer LIKE '{queue_name}' AND farmer LIKE '{exchange_name}'")
        res = cursor.fetchone()
        if res[0] == 0:
            connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_service_addr))
            channel = connection.channel()
            channel.queue_declare(queue=queue_name, exclusive=False, durable=True)
            channel.exchange_declare(exchange=exchange_name, exchange_type='fanout')
            channel.queue_bind(exchange=exchange_name, queue=queue_name)
            connection.close()
            try:
                db.execute(
                    "INSERT INTO subscription (customer, farmer) VALUES (?, ?)",
                    (queue_name, exchange_name),
                )
                db.commit()
            except db.IntegrityError:
                error = f"Integrity error: provide customer and farmer ids"
            flash(error)
            return '', 200
        else:
            return 'This binding already exists in the DB', 200
    def patch(self, user_id):
        # Delete a binding
        db = get_db()
        queue_name = "user_" + user_id
        print("PRINT: " + request.get_json()['farmer_id'])
        exchange_name = "farmer_" + request.get_json()['farmer_id']
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_service_addr))
        channel = connection.channel()

        cursor = db.cursor()
        cursor.execute(f"SELECT count(*) FROM subscription WHERE customer LIKE '{queue_name}' AND farmer LIKE '{exchange_name}'")
        res = cursor.fetchone()
        if res[0] > 0:
            cursor.execute(
                f"DELETE FROM subscription WHERE customer LIKE '{queue_name}' AND farmer LIKE '{exchange_name}'"
            )
            db.commit()
            channel.queue_declare(queue=queue_name, exclusive=False, durable=True)
            channel.exchange_declare(exchange=exchange_name, exchange_type='fanout')
            channel.queue_unbind(exchange=exchange_name, queue=queue_name)
            
        cursor.execute(f"SELECT count(*) FROM subscription WHERE customer LIKE '{queue_name}'")
        res = cursor.fetchone()
        if res[0] == 0:
            channel.queue_delete(queue=queue_name)
        
        connection.close()
        return '', 200
    def get(self, user_id):
        # Reads all the messages in the queue
        db = get_db()
        queue_name = "user_" + user_id
        cursor = db.cursor()
        cursor.execute(f"SELECT count(*) FROM subscription WHERE customer LIKE '{queue_name}'")
        res = cursor.fetchone()
        if res[0] > 0:
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
            return jsonify(messages[1:])
        return ''
    def delete(self, user_id):
        # Deletes the queue
        db = get_db()
        queue_name = "user_" + user_id
        cursor = db.cursor()
        cursor.execute(f"SELECT * FROM subscription WHERE customer LIKE '{queue_name}'")
        res = cursor.fetchall()
        if len(res) > 0:
            connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_service_addr))
            channel = connection.channel()
            channel.queue_delete(queue=queue_name)
            db.execute(
                f"DELETE FROM subscription WHERE customer LIKE '{queue_name}'"
            )
            db.commit()
            for row in res:
                cursor.execute(f"SELECT count(*) FROM subscription WHERE farmer LIKE '{row[2]}'")
                farmer_res = cursor.fetchone()
                if farmer_res[0] == 0:
                    channel.exchange_delete(exchange=row[2], if_unused=False)
            connection.close()

        return '', 200

class Exchange(Resource):
    def post(self, farmer_id):
        # Delivers a message to the exchange
        db = get_db()
        exchange_name = "farmer_" + farmer_id

        cursor = db.cursor()
        cursor.execute(f"SELECT count(*) FROM subscription WHERE farmer LIKE '{exchange_name}'")
        res = cursor.fetchone()

        if res[0] > 0:
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
        db = get_db()
        exchange_name = "farmer_" + farmer_id

        cursor = db.cursor()
        cursor.execute(f"SELECT * FROM subscription WHERE farmer LIKE '{exchange_name}'")
        res = cursor.fetchall()
        if len(res) > 0:
            connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_service_addr))
            channel = connection.channel()
            channel.exchange_delete(exchange=exchange_name, if_unused=False)
            db.execute(
                f"DELETE FROM subscription WHERE farmer LIKE '{exchange_name}'"
            )
            db.commit()
            for row in res:
                cursor.execute(f"SELECT count(*) FROM subscription WHERE customer LIKE '{row[1]}'")
                customer_res = cursor.fetchone()
                if customer_res[0] == 0:
                    channel.queue_delete(queue=row[1])
            connection.close()
        return '', 200
