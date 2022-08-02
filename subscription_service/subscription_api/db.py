import sqlite3

import click
from flask import current_app, g
from flask.cli import with_appcontext
import pika
import environ
# For managing the environment variables
env = environ.Env()
environ.Env.read_env()

# Use this when containerized
rabbitmq_service_addr = env('RABBITMQ_SERVICE')

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

def restore_rabbitmq():
    db = get_db()
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_service_addr))
    channel = connection.channel()
    for row in db.cursor().execute("SELECT * FROM subscription"):
        channel.queue_declare(queue=row[1], exclusive=False, durable=True)
        channel.exchange_declare(exchange=row[2], exchange_type='fanout')
        channel.queue_bind(exchange=row[2], queue=row[1])
    connection.close()

@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')

@click.command('restore-rabbitmq')
@with_appcontext
def restore_rabbitmq_command():
    """Restore the rabbitMQ exchanges and queues"""
    restore_rabbitmq()
    click.echo('Restored rabbitmq exchanges and queues.')

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
    app.cli.add_command(restore_rabbitmq_command)
