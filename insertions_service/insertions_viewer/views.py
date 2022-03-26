from django.shortcuts import render
from django.http import HttpResponse
from insertions_manager.models import Insertion, Box
from djongo import *
import datetime
import os

# Create your views here.
def index(request):
    insertions = Insertion.objects.filter()
    context = {}
    context['insertions'] = insertions
    print(type(insertions))
    return render(request, 'views/index.html', context)

def new(request):
    context = {}
    context['sizes'] = ["small", "medium", "big"]
    return render(request, 'views/new.html', context)

def show(request, insertion_id):
    insertion = Insertion.objects.get(id=insertion_id)
    boxes = Box.objects.filter(insertion_id=insertion.id)
    context = {}
    context['insertion'] = insertion
    context['boxes'] = boxes
    return render(request, 'views/show.html', context)