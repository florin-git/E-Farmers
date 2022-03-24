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

    def _str_(self):
        return "Title: " + self.title + "\nDescription: " + self.description + "\nExpiring in: " + str(self.expiring_in) + " days\nGathering location: " + self.gathering_location + "\n\n"

    @staticmethod
    def getAllInsertions():
        insertions = Insertion.objects.filter()
        for insertion in insertions:
            print("insertion:\n", Insertion._str_(insertion))
        return insertions
