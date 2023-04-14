# Subscription service

This service implements the subscription funcionality: a customer (user) can subscribe to a farmer in order to be notified when that farmer publishes new insertions.

## Usage
- Install dependencies: `/path/to/E-Farmers/subscription_service$ pip install -r requirements.txt`
- Add .env file in `/path/to/E-Farmers/subscription_service/subscription_api/` folder
- Define environment variable: (**Linux**) `export FLASK_APP=subscription_api` or (**Windows**) `set FLASK_APP=subscription_api`. If debug mode needed, define: (**Linux**) `export FLASK_DEBUG=1` or (**Windows**) `set FLASK_DEBUG=1`
- Start RabbitMQ docker container: `sudo docker run -it --rm --name rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management` 
- Initialize the database: `/path/to/E-Farmers/subscription_service$ flask init-db`
- Restore the rabbitMQ exchanges and queues: `/path/to/E-Farmers/subscription_service$ flask restore-rabbitmq`
- Start the flask server: `/path/to/E-Farmers/subscription_service$ flask run`

### File .env
```
RABBITMQ_SERVICE=localhost
```
