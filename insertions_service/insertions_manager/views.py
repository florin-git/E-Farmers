from pickletools import read_uint1
from django.shortcuts import render, redirect
from django.http import HttpResponse
from insertions_manager.models import Insertion, Box
import datetime

def publish(request):
    if request.POST['title'] != '':
        new_insertion = Insertion(title=request.POST['title'], description=request.POST['description'], gathering_location=request.POST['gathering_location'], reported=False)
        if request.POST['expiration_date'] != '' :
            expiration_date = request.POST['expiration_date'].split("-")
            new_insertion.expiration_date = datetime.date(int(expiration_date[0]), int(expiration_date[1]), int(expiration_date[2]))
        if request.FILES.get('image', False): new_insertion.image = request.FILES['image']
        new_insertion.save()

        if request.POST['number_small_boxes'] != '' and request.POST['weight_small_boxes'] != '' and request.POST['price_small_boxes'] != '':
            new_small_box = Box(insertion=new_insertion, weight=request.POST['weight_small_boxes'], size=0, price=request.POST['price_small_boxes'], number_of_available_boxes=request.POST['number_small_boxes'])
            new_small_box.save()

        if request.POST['number_medium_boxes'] != '' and request.POST['weight_medium_boxes'] != '' and request.POST['price_medium_boxes'] != '':
            new_medium_box = Box(insertion=new_insertion, weight=request.POST['weight_medium_boxes'], size=1, price=request.POST['price_medium_boxes'], number_of_available_boxes=request.POST['number_medium_boxes'])
            new_medium_box.save()

        if request.POST['number_big_boxes'] != '' and request.POST['weight_big_boxes'] != '' and request.POST['price_big_boxes'] != '':
            new_big_box = Box(insertion=new_insertion, weight=request.POST['weight_big_boxes'], size=2, price=request.POST['price_big_boxes'], number_of_available_boxes=request.POST['number_big_boxes'])
            new_big_box.save()
    
    return redirect('insertions')

def delete(request, insertion_id):
    insertion = Insertion.objects.get(id=insertion_id)
    insertion.delete()
    return redirect('insertions')