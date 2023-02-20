from django.db import models
from django.contrib.postgres.fields import ArrayField

class Cart(models.Model):
    # User cart owner
    user = models.IntegerField(primary_key=True)
    
    # Date at which the cart was created
    creation_date = models.DateTimeField(verbose_name='creation date', auto_now_add=True)

    # Boolean to check if the cart has been checked out
    checked_out = models.BooleanField(default=False, verbose_name='checked out')

    # Float to sum the price of each item in the cart
    total_amount = models.FloatField(default=0.0, verbose_name='total_amount')

    # Boxes added to the cart
    boxes = ArrayField((models.IntegerField(default=0)), default=list)
