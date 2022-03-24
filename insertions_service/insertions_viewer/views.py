import pymongo
import pprint
from django.shortcuts import render
from pymongo import MongoClient
from django.http import HttpResponse
from insertions_manager.models import Insertion
from djongo import *

# Create your views here.
def index(request):
    insertions = Insertion.getAllInsertions()
    response = ""
    for insertion in insertions:
        response += Insertion._str_(insertion)
    return HttpResponse("<h1>E-Farmers</h1><h3>Insertions</h3><p>%s</p>" % response)

def generate_test_insertions(request):
    insertion_1 = Insertion(title='Melanzane', description='Buone', expiring_in=10, gathering_location='Casa mia', reported=False)
    insertion_2 = Insertion(title='Cipolle', description='Fanno schifo non compratele', expiring_in=1, gathering_location='Sul GRA', reported=False)
    insertion_1.save()
    insertion_2.save()
    return HttpResponse("Generated test insertions 'Melanzane' and 'Cipolle'")