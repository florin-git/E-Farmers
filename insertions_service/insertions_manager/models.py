from djongo import models
import datetime

class Insertion(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    expiration_date = models.DateField(default=datetime.date(1977, 1, 1))
    gathering_location = models.CharField(max_length=100)
    image = models.ImageField()
    reported = models.BooleanField()

class Box(models.Model):
    insertion = models.ForeignKey(Insertion, on_delete=models.CASCADE)
    weight = models.IntegerField()
    size = models.IntegerField()
    price = models.IntegerField()