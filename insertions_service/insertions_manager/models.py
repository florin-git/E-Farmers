from email.policy import default
from typing_extensions import Required
from djongo import models
from django import forms
from django.forms import ModelForm, DateInput
import datetime

class Insertion(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    expiration_date = models.DateField()
    gathering_location = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='images/', blank=True)
    reported = models.BooleanField(default=False)

    def check_expiration_date(expiration_date):
        return 0

class Box(models.Model):
    insertion = models.ForeignKey(Insertion, on_delete=models.CASCADE)
    weight = models.IntegerField(default=0)
    ### The attribute size will take one of the three values: 0, 1 and 2
    ### 0 is a small box
    ### 1 is a medium box
    ### 2 is a big box
    size = models.IntegerField(default=0)
    price = models.DecimalField(default=0.0, decimal_places=2, max_digits=5)
    number_of_available_boxes = models.IntegerField(default=0)

class InsertionForm(ModelForm):
    class Meta:
        model = Insertion
        fields = ['title', 'description', 'expiration_date', 'gathering_location', 'image']
        widgets = {
            'expiration_date': forms.widgets.DateInput(attrs={'type': 'date'}),
        }

class BoxForm(ModelForm):
    class Meta:
        model = Box
        fields = ['weight', 'size', 'price', 'number_of_available_boxes']