# Generated by Django 4.0.3 on 2022-03-31 16:36

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('insertions_manager', '0015_alter_box_size'),
    ]

    operations = [
        migrations.AlterField(
            model_name='box',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=5, validators=[django.core.validators.MinValueValidator(0)]),
        ),
    ]
