from email.policy import default
from djongo import models
from django.forms import ModelForm
import datetime

class Insertion(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    expiration_date = models.DateField(default=datetime.date(1977, 1, 1))
    gathering_location = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/')
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

