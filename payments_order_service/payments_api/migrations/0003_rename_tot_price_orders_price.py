# Generated by Django 3.2.9 on 2023-03-13 18:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('payments_api', '0002_rename_price_orders_tot_price'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orders',
            old_name='tot_price',
            new_name='price',
        ),
    ]
