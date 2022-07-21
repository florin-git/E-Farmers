from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime


class User(AbstractUser):
    # first_name = models.CharField(verbose_name="First Name", max_length=255)
    # last_name = models.CharField(verbose_name="Last Name", max_length=255)
    email = models.EmailField(verbose_name="Email", max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None
    
    # Additional Fields
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



# class User(models.Model):
#                             #use this instead of User
#     user = models.OneToOneField(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
#     bio = models.TextField()
#     date_of_birth = models.DateField(default=datetime.date(1977, 1, 1))
#     phone = models.CharField( default= ' ' , max_length=10 )
#     billing_address = models.CharField(default = ' ' , max_length = 60)
#     shipping_address = models.CharField(default = ' ' , max_length = 60)

#     def __str__(self):
#         return str(self.user)
