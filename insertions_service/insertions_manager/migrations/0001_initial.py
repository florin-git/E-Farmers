# Generated by Django 4.0.3 on 2022-03-24 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Insertion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=200)),
                ('expiring_in', models.IntegerField()),
                ('gathering_location', models.CharField(max_length=100)),
                ('image', models.ImageField(upload_to='')),
                ('reported', models.BooleanField()),
            ],
        ),
    ]
