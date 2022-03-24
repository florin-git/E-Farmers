import pymongo
import pprint
from django.shortcuts import render
from pymongo import MongoClient
from django.http import HttpResponse
from insertions_manager.models import Insertion
from djongo import *
from django.core import serializers

# Create your views here.
def index(request):
    insertions = Insertion.getAllInsertions()
    json_data = serializers.serialize("json",insertions)    
    context = {}
    context['insertions'] = insertions
    return render(request, 'views/index.html', context)

def generate_test_insertions(request):
    insertion_1 = Insertion(title='Melanzane', description='Buone', expiring_in=10, gathering_location='Casa mia', reported=False)
    insertion_2 = Insertion(title='Cipolle', description='Fanno schifo non compratele', expiring_in=1, gathering_location='Sul GRA', reported=False)
    insertion_1.save()
    insertion_2.save()
    return HttpResponse("Generated test insertions 'Melanzane' and 'Cipolle'")