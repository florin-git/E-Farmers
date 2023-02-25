from django.db import models
from django.core.validators import MinValueValidator
from django.utils.translation import gettext_lazy as _
from insertions_api.box_sizes import *

class User(models.Model):
    id = models.IntegerField(primary_key=True)
    class Meta:
        db_table = 'users_api_user'
        managed = False

class Farmer(models.Model):
    id = models.IntegerField(primary_key=True)
    class Meta:
        db_table = 'users_api_farmer'
        managed = False

class Insertion(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    expiration_date = models.DateField()
    gathering_location = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='images/', blank=True)
    reported = models.BooleanField(default=False)
    farmer = models.IntegerField(default=-1)

class Box(models.Model):
    insertion = models.ForeignKey(Insertion, on_delete=models.CASCADE)
    weight = models.DecimalField(default=0.0, decimal_places=3, max_digits=6, validators=[MinValueValidator(0)])
    size = models.IntegerField(choices=BOX_SIZES, default=0)
    price = models.DecimalField(default=0.0, decimal_places=2, max_digits=5, validators=[MinValueValidator(0)])
    number_of_available_boxes = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])

class Request(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    comment = models.TextField(blank=True)
    weight = models.DecimalField(default=0.0, decimal_places=3, max_digits=6, validators=[MinValueValidator(0)])
    deadline = models.DateField()