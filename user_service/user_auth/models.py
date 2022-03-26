from unittest.util import _MAX_LENGTH
from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
import datetime

class Profile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    bio = models.TextField()
    date_of_birth = models.DateField(default=datetime.date(1977, 1, 1))
    phone = models.CharField( max_length=10 )
    billing_address = models.CharField(max_length = 60)
    shipping_address = models.CharField(max_length = 60)

    def __str__(self):
        return str(self.user)