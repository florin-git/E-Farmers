# Generated by Django 3.2.9 on 2023-04-04 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoppingcart_api', '0002_cartitem_box_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartitem',
            name='size',
            field=models.IntegerField(choices=[(0, 'Small'), (1, 'Medium'), (2, 'Big'), (3, 'Private')], default=0),
        ),
    ]
