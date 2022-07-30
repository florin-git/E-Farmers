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