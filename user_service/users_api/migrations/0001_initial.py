# Generated by Django 4.0.3 on 2022-05-20 15:50

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bio', models.TextField()),
                ('date_of_birth', models.DateField(default=datetime.date(1977, 1, 1))),
                ('phone', models.CharField(default=' ', max_length=10)),
                ('billing_address', models.CharField(default=' ', max_length=60)),
                ('shipping_address', models.CharField(default=' ', max_length=60)),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
