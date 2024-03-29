# Generated by Django 3.2.9 on 2023-04-07 17:27

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'users_api_user',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Insertion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('description', models.TextField(blank=True)),
                ('expiration_date', models.DateField()),
                ('gathering_location', models.CharField(blank=True, max_length=100)),
                ('image', models.ImageField(blank=True, upload_to='images/')),
                ('reported', models.BooleanField(default=False)),
                ('private', models.BooleanField(default=False)),
                ('farmer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='insertion_farmer', to='insertions_api.user')),
            ],
        ),
        migrations.CreateModel(
            name='Request',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('comment', models.TextField(blank=True)),
                ('weight', models.DecimalField(decimal_places=3, default=0.0, max_digits=6, validators=[django.core.validators.MinValueValidator(0)])),
                ('deadline', models.DateField()),
                ('farmer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='request_farmer', to='insertions_api.user')),
                ('insertion', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='request_insertion', to='insertions_api.insertion')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='request_user', to='insertions_api.user')),
            ],
        ),
        migrations.AddField(
            model_name='insertion',
            name='request',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='insertion_request', to='insertions_api.request'),
        ),
        migrations.CreateModel(
            name='Box',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('weight', models.DecimalField(decimal_places=3, default=0.0, max_digits=6, validators=[django.core.validators.MinValueValidator(0)])),
                ('size', models.IntegerField(choices=[(0, 'Small'), (1, 'Medium'), (2, 'Big'), (3, 'Custom')], default=0)),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=5, validators=[django.core.validators.MinValueValidator(0)])),
                ('number_of_available_boxes', models.PositiveIntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
                ('insertion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='insertions_api.insertion')),
            ],
        ),
    ]
