# Generated by Django 4.0.3 on 2023-04-03 08:15

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('users_api', '0003_auto_20230402_1635'),
    ]

    operations = [
        migrations.AlterField(
            model_name='farmer',
            name='since',
            field=models.DateField(blank=True, default=django.utils.timezone.now),
        ),
    ]
