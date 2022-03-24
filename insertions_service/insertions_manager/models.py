"""
import pymongo
from django.db import models
from pymongo import MongoClient
"""
import pymongo
from pymongo import MongoClient
from djongo import models

# Create your models here.
class Insertion(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    expiring_in = models.IntegerField()
    gathering_location = models.CharField(max_length=100)
    image = models.ImageField()
    reported = models.BooleanField()
