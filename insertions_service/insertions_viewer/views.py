from django.shortcuts import render
from django.http import HttpResponse
from insertions_manager.models import Insertion
from djongo import *
import datetime
import os

# Create your views here.
def index(request):
    insertions = Insertion.objects.filter()
    context = {}
    context['insertions'] = insertions
    return render(request, 'views/index.html', context)

def generate_test_insertions(request):
    insertion_1 = Insertion(title='Melanzane', description='Buone', expiration_date=datetime.date(2022, 4, 19), gathering_location='Casa mia', reported=False)
    insertion_2 = Insertion(title='Cipolle', description='Fanno schifo non compratele', expiration_date=datetime.date(2022, 3, 28), gathering_location='Sul GRA', reported=False)
    insertion_3 = Insertion(title='Zucchine', description='Potevano venire meglio', expiration_date=datetime.date(2022, 4, 3), reported=False)
    insertion_1.save()
    insertion_2.save()
    insertion_3.save()
    return HttpResponse("Generated test insertions 'Melanzane', 'Cipolle' and 'Zucchine'")

def test_image(request):
    module_dir = os.path.dirname(__file__)  # get current directory
    file_path = os.path.join(module_dir, './templates/views/anguria.jpg')
    image_data = open(file_path, "rb").read()
    return HttpResponse(image_data, content_type="image/png")
