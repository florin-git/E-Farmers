from django.db import models
from django.core.validators import MinValueValidator
from shoppingcart_api.box_sizes import *

class Cart(models.Model):
    # User cart owner
    user = models.IntegerField(primary_key=True)
    
    # Date at which the cart was created
    creation_date = models.DateTimeField(verbose_name='creation date', auto_now_add=True)

    # Boolean to check if the cart has been checked out
    checked_out = models.BooleanField(default=False, verbose_name='checked out')

    # Float to sum the price of each item in the cart
    total_amount = models.FloatField(default=0.0, verbose_name='total_amount')

    current_farmer = models.IntegerField(verbose_name='current_farmer')


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    weight = models.DecimalField(default=0.0, decimal_places=3, max_digits=6, validators=[MinValueValidator(0)])
    size = models.IntegerField(choices=BOX_SIZES, default=0)
    price = models.DecimalField(default=0.0, decimal_places=2, max_digits=5, validators=[MinValueValidator(0)])
