# Subscription service

This service implements the subscription funcionality: a customer (user) can subscribe to a farmer in order to be notified when that farmer publishes new insertions.

## API

### Resource: Queue
#### PUT
Creates a new queue. Each customer has its own queue.

#### PATCH
Creates a new binding between a queue (customer) and an exchange (farmer). When the farmer will publish a new message on its exchange, the message will be delivered to all the queues that are bound to that exchange.

#### GET
Reads all the messages in the queue

#### DELETE
Deletes the queue

### Resource: Exchange
#### PUT
Creates a new exchange. Each farmer has its own exchange.

#### POST
Passes a message to the exchange. The exchange will deliver the message to all the queues it is bound to.

#### DELETE
Deletes the exchange.

## Usage
- Install dependencies: `/path/to/E-Farmers/subscription_service$ pip install -r requirements.txt`
- Start RabbitMQ docker container: `sudo docker run -it --rm --name rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management` 
- Add .env file in `/path/to/E-Farmers/subscription_service` folder 
- Start the flask server: `/path/to/E-Farmers/subscription_service$ python3 app.py`

.env 
```
RABBITMQ_SERVICE=localhost
```