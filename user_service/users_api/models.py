from django.db import models
from django.conf import settings
import datetime

class User(models.Model):
                            #use this instead of User
    user = models.OneToOneField(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
    bio = models.TextField()
    date_of_birth = models.DateField(default=datetime.date(1977, 1, 1))
    phone = models.CharField( default= ' ' , max_length=10 )
    billing_address = models.CharField(default = ' ' , max_length = 60)
    shipping_address = models.CharField(default = ' ' , max_length = 60)

    def __str__(self):
        return str(self.user)
