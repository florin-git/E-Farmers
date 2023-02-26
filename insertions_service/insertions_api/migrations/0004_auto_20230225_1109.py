# Generated by Django 3.2.9 on 2023-02-25 11:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('insertions_api', '0003_farmer_request_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='insertion',
            name='private',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='insertion',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='insertions_api.user'),
        ),
    ]