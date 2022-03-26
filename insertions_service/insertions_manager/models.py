from djongo import models
import datetime

class Insertion(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    expiration_date = models.DateField(default=datetime.date(1977, 1, 1))
    gathering_location = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/')
    reported = models.BooleanField()

class Box(models.Model):
    insertion = models.ForeignKey(Insertion, on_delete=models.CASCADE)
    weight = models.IntegerField()
    ### The attribute size will take three values: 0, 1 and 2
    ### 0 is a small box
    ### 1 is a medium box
    ### 2 is a big box
    size = models.IntegerField()
    price = models.IntegerField()
    number_of_available_boxes = models.IntegerField()