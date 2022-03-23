from http.client import HTTPResponse
import pymongo
from django.shortcuts import render
from pymongo import MongoClient
from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse("Hello world")