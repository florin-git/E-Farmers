from decimal import InvalidOperation
from pickletools import read_uint1
from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect
from insertions_manager.models import *
from datetime import datetime as dt
import datetime

def publish(request):
    if request.method == 'POST':
        insertion_form = InsertionForm(request.POST, request.FILES)
        if insertion_form.is_valid():
            print(request.POST)
            insertion = insertion_form.save()
            return HttpResponseRedirect(f'/insertions/{insertion.id}/boxes/add/')
        else: return HttpResponseBadRequest("Something went wrong with the data supplied")
    else: return HttpResponseBadRequest("Bad request")

def delete(request, insertion_id):
    insertion = Insertion.objects.get(id=insertion_id)
    insertion.image.delete()
    insertion.delete()
    return redirect('insertions')
