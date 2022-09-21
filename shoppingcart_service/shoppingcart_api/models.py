from email.policy import default
from tabnanny import verbose
from django.db import models

class Cart(models.Model):
    # User cart owner
    user = models.IntegerField(default=-1)
    
    # Date at which the cart was created
    creation_date = models.DateTimeField(verbose_name='creation date')
    
    # Boolean to check if the cart has been checked out
    checked_out = models.BooleanField(default=False, verbose_name='checked out')

    # Float to sum the price of each item in the cart
    total_amount = models.FloatField(default=0.0, verbose_name='total_amount')

# Boxes added
class BoxAdded(models.Model):
    dict_id = models.IntegerField(db_index=True)

class KeyValue(models.Model):
    container = models.ForeignKey(BoxAdded, db_index=True)
    # Key -> insertion id
    # Value -> box's size
    key = models.PositiveIntegerField(db_index=True)
    value = models.IntegerField(db_index=True)