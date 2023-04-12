from pickle import FALSE
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone
from users_api.account_type import *
import datetime

class User(AbstractUser):
    # first_name = models.CharField(verbose_name="First Name", max_length=255)
    # last_name = models.CharField(verbose_name="Last Name", max_length=255)
    email = models.EmailField(verbose_name="Email", max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None
    name = models.CharField(max_length=255, blank=True)
    insertions = ArrayField(ArrayField(models.PositiveIntegerField(default=0)), default=list)
    carts = ArrayField(ArrayField(models.PositiveBigIntegerField(default=0)), default=list)
    # Other properties
    # Account Type
    account_type = models.SmallIntegerField(choices=ACCOUNT_TYPE, default=0)
   # age = models.IntegerField(default=0)
    phone_number = models.CharField( default= ' ' , max_length=12, blank=True)
    billing_address = models.CharField(default = ' ' , max_length = 60, blank=True)
    shipping_address = models.CharField(default = ' ' , max_length = 60, blank=True)

    USERNAME_FIELD = "email"
    # REQUIRED_FIELDS = ['first_name', 'last_name']
    REQUIRED_FIELDS = []

    def __str__(self):
        return str(self.email)

class Rider(models.Model):
    # Rider Properties 
    available = models.BooleanField(default = FALSE)  
    bio = models.CharField(max_length = 255)
    ext_user = models.OneToOneField (
        User,
        related_name="external_user_r",
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    def __str__(self):
        return str(self.bio)

class Farmer(models.Model):
    # Farmer Properties
    farm_location = models.CharField(max_length=255)
    bio = models.CharField(max_length = 255)
    number_insertions = models.SmallIntegerField(default=0)
    since = models.DateField(default=datetime.date.today, blank=True)
 
    ext_user = models.OneToOneField (
        User,
        related_name="external_user_f",     
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    def __str__(self):
        return str(self.bio)

class Review(models.Model):
    
    rating = models.DecimalField(default = 0.0, decimal_places =1, max_digits = 3)
    comment = models.TextField(default = None)
    writer_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank = True,
        null = True
    )
    farmer_user = models.IntegerField(default=0)

    def __strd__(self):
        return self.comment