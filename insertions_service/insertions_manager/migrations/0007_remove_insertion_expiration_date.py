# Generated by Django 4.0.3 on 2022-03-25 14:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('insertions_manager', '0006_alter_insertion_expiration_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='insertion',
            name='expiration_date',
        ),
    ]
