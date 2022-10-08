from pickle import FALSE
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
import datetime

class Order(models.Model):
    amount = models.DecimalField(decimal_places = 2, max_digits = 10)
    description = models.TextField(max_length=255)
    phone_number = models.CharField( default= ' ' , max_length=10 )
    billing_address = models.CharField(default = ' ' , max_length = 60)
    shipping_address = models.CharField(default = ' ' , max_length = 60)
    order_ID = models.IntegerField()
    

    def __str__(self):
        return str(self.ext_user)
