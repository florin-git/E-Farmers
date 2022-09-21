from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
import datetime
from users_api.account_type import *

class User(AbstractUser):
    # first_name = models.CharField(verbose_name="First Name", max_length=255)
    # last_name = models.CharField(verbose_name="Last Name", max_length=255)
    email = models.EmailField(verbose_name="Email", max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None
    name = models.CharField(max_length=255, blank=True)
    insertions = ArrayField(ArrayField(models.PositiveIntegerField(default=0)), default=list)
    carts = ArrayField(ArrayField(models.PositiveBigIntegerField(default=0)), default=list)
    
    # Additional Fields
    account_type = models.SmallIntegerField(choices=ACCOUNT_TYPE, default=0)
    # bio = models.TextField()
    # date_of_birth = models.DateField(default=datetime.date(1977, 1, 1))
    # phone = models.CharField( default= ' ' , max_length=10 )
    # billing_address = models.CharField(default = ' ' , max_length = 60)
    # shipping_address = models.CharField(default = ' ' , max_length = 60)
    
    USERNAME_FIELD = "email"
    # REQUIRED_FIELDS = ['first_name', 'last_name']
    REQUIRED_FIELDS = []

    def __str__(self):
        return str(self.user)
