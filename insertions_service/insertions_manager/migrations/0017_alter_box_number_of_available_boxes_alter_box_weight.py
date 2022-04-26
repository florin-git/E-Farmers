# Generated by Django 4.0.3 on 2022-03-31 19:41

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('insertions_manager', '0016_alter_box_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='box',
            name='number_of_available_boxes',
            field=models.PositiveIntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)]),
        ),
    ]
