# Generated by Django 3.2.5 on 2022-10-19 18:08

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('user', models.IntegerField(primary_key=True, serialize=False)),
                ('creation_date', models.DateTimeField(auto_now_add=True, verbose_name='creation date')),
                ('checked_out', models.BooleanField(default=False, verbose_name='checked out')),
                ('total_amount', models.FloatField(default=0.0, verbose_name='total_amount')),
                ('current_farmer', models.IntegerField(unique=True, verbose_name='current_farmer')),
            ],
        ),
        migrations.CreateModel(
            name='CartItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.DecimalField(decimal_places=3, default=0.0, max_digits=6, validators=[django.core.validators.MinValueValidator(0)])),
                ('size', models.IntegerField(choices=[(0, 'Small'), (1, 'Medium'), (2, 'Big')], default=0)),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=5, validators=[django.core.validators.MinValueValidator(0)])),
                ('cart', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shoppingcart_api.cart')),
            ],
        ),
    ]
