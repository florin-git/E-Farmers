from tabnanny import verbose
from django.db import models

"""
    CASCADE: When the referenced object is deleted, also delete the objects that have references to it (when you remove a blog post for instance, you might want to delete comments as well). SQL equivalent: CASCADE.
    PROTECT: Forbid the deletion of the referenced object. To delete it you will have to delete all objects that reference it manually. SQL equivalent: RESTRICT.
    RESTRICT: (introduced in Django 3.1) Similar behavior as PROTECT that matches SQL's RESTRICT more accurately. (See django documentation example)
    SET_NULL: Set the reference to NULL (requires the field to be nullable). For instance, when you delete a User, you might want to keep the comments he posted on blog posts, but say it was posted by an anonymous (or deleted) user. SQL equivalent: SET NULL.
    SET_DEFAULT: Set the default value. SQL equivalent: SET DEFAULT.
    SET(...): Set a given value. This one is not part of the SQL standard and is entirely handled by Django.
    DO_NOTHING: Probably a very bad idea since this would create integrity issues in your database (referencing an object that actually doesn't exist). SQL equivalent: NO ACTION
"""

# Create your models here.
class Cart(models.Model):
    creation_date = models.DateTimeField(verbose_name='creation date')
    checked_out = models.BooleanField(default=False, verbose_name='checked out')
    user = models.ForeignKey(
        """
        How to import models from another project / retrieve info from DB 
        """
    )
    class Meta:
        verbose_name = 'cart'


class Cart_Item(models.Model):
    cart = models.ForeignKey(
        Cart,
        verbose_name='cart',
        on_delete=models.CASCADE
    )
    quantity = models.PositiveIntegerField(verbose_name='quantity')

class Item_Manager(models.Manager):
    pass