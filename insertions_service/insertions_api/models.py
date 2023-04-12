from django.db import models
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from insertions_api.box_sizes import *

class User(models.Model):
    id = models.IntegerField(primary_key=True)
    class Meta:
        db_table = 'users_api_user'
        managed = False

class Insertion(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    expiration_date = models.DateField()
    gathering_location = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='images/', blank=True)
    reported = models.BooleanField(default=False)
    farmer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='insertion_farmer')
    private = models.BooleanField(default=False)
    request = models.OneToOneField(
        'Request',
        related_name="insertion_request",
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

class Box(models.Model):
    id = models.BigAutoField(primary_key=True)
    insertion = models.ForeignKey(Insertion, on_delete=models.CASCADE)
    weight = models.DecimalField(default=0.0, decimal_places=3, max_digits=6, validators=[MinValueValidator(0)])
    size = models.IntegerField(choices=BOX_SIZES, default=0)
    price = models.DecimalField(default=0.0, decimal_places=2, max_digits=5, validators=[MinValueValidator(0)])
    number_of_available_boxes = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])

class Request(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='request_user')
    farmer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='request_farmer')
    title = models.CharField(max_length=50)
    comment = models.TextField(blank=True)
    weight = models.DecimalField(default=0.0, decimal_places=3, max_digits=6, validators=[MinValueValidator(0)])
    deadline = models.DateField()
    insertion = models.OneToOneField(
        Insertion,
        related_name="request_insertion",
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )