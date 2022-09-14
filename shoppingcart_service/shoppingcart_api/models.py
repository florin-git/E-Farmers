from tabnanny import verbose
from django.db import models
from user_service.users_api import models as user_service_model
from insertions_service.insertions_api import models as insertions_service_model

class Cart(models.Model):
    # User cart owner
    user = models.ForeignKey(user_service_model.User)
    
    # Date at which the cart was created
    creation_date = models.DateTimeField(verbose_name='creation date')
    
    # Boolean to check if the cart has been checked out
    checked_out = models.BooleanField(default=False, verbose_name='checked out')

    # Float to sum the price of each item in the cart
    total_amount = models.FloatField(default=0.0, verbose_name='total_amount')

    # Boxes added to the cart
    box = models.ForeignKey(insertions_service_model.Box)