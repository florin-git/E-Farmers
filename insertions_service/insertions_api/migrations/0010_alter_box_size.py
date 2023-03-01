# Generated by Django 4.0.3 on 2023-03-01 15:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('insertions_api', '0009_remove_insertion_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='box',
            name='size',
            field=models.IntegerField(choices=[(0, 'Small'), (1, 'Medium'), (2, 'Big'), (3, 'Custom')], default=0),
        ),
    ]
