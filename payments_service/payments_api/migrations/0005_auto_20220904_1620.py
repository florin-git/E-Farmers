# Generated by Django 3.1.13 on 2022-09-04 16:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payments_api', '0004_auto_20220904_1542'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='stripe_product_id',
        ),
        migrations.AddField(
            model_name='product',
            name='price',
            field=models.IntegerField(default=0),
        ),
        migrations.DeleteModel(
            name='Price',
        ),
    ]
