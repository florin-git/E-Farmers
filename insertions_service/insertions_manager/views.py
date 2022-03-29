from decimal import InvalidOperation
from pickletools import read_uint1
from django.shortcuts import render, redirect
from django.http import HttpResponse
from insertions_manager.models import Insertion, Box
from insertions_manager.exceptions import EmptyMandatoryFieldException, ExpirationDateException
from datetime import datetime as dt
import datetime

def publish(request):
    title = request.POST['title']
    expiration_date = request.POST['expiration_date'].split("-")
    types_of_box = {0: "small", 1: "medium", 2: "big"}

    try:
        if title == '' or expiration_date == '' : raise EmptyMandatoryFieldException
        today = dt.today().strftime('%Y-%m-%d').split("-")
        if expiration_date <= today : raise ExpirationDateException
    except EmptyMandatoryFieldException:
        return HttpResponse("Title and expiration date are mandatory")
    except ExpirationDateException:
        return HttpResponse("Incorrect expiration date")

    new_insertion = Insertion(title=request.POST['title'], description=request.POST['description'], gathering_location=request.POST['gathering_location'], reported=False)
    new_insertion.expiration_date = datetime.date(int(expiration_date[0]), int(expiration_date[1]), int(expiration_date[2]))
    if request.FILES.get('image', False): new_insertion.image = request.FILES['image']

    new_insertion.save()

    for key in types_of_box:
        number_boxes = request.POST[f'number_{types_of_box[key]}_boxes']
        weight_boxes = request.POST[f'weight_{types_of_box[key]}_boxes']
        price_boxes = request.POST[f'price_{types_of_box[key]}_boxes']
        try:
            if number_boxes != '' and weight_boxes != '' and price_boxes != '':
                number_boxes = int(number_boxes)
                weight_boxes = int(weight_boxes)
                price_boxes = int(price_boxes)
                new_box = Box(insertion=new_insertion, weight=weight_boxes, size=key, price=price_boxes, number_of_available_boxes=number_boxes)
                new_box.save()
        except ValueError:
            return HttpResponse("The number of boxes available, the weight of each box and the price of each box must follow the format given")

    return redirect('insertions')

def delete(request, insertion_id):
    insertion = Insertion.objects.get(id=insertion_id)
    insertion.delete()
    return redirect('insertions')
