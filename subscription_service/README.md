# Subscription service

This service implements the subscription funcionality: a customer (user) can subscribe to a farmer in order to be notified when that farmer publishes new insertions.

## API

### Resource: Queue
#### PUT
##### Parameter: user's id
##### JSON: `{"farmer_id":"xxx"}`
Creates a new binding between the customer's queue and the farmer's exchange. If the queue or the exchange do not exist, they are created. Each customer has its own queue.

#### PATCH
##### Parameter: user's id
##### JSON: `{"farmer_id":"xxx"}`
Deletes a binding between a customer's queue and a farmer's exchange.

#### GET
##### Parameter: user's id
Reads all the messages in the queue.

#### DELETE
##### Parameter: user's id
Deletes the queue.

### Resource: Exchange

#### POST
##### Parameter: farmer's id
##### JSON: `{"message":"XXX"}
Passes a message to the exchange relative to the farmer. If the exchange does not exists, it is created. The exchange will deliver the message to all the queues it is bound to.

#### DELETE
##### Parameter: farmer's id
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