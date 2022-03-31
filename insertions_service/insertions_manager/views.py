from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect
from djongo import *
from .models import *

def index(request):
    insertions = Insertion.objects.filter()
    context = {}
    context['insertions'] = insertions
    return render(request, 'views/index.html', context)

def new(request):
    if request.method == 'GET':
        context = {}
        insertion_form = InsertionForm()
        context['insertion_form'] = insertion_form
        return render(request, 'views/new.html', context)
    elif request.method == 'POST':
        insertion_form = InsertionForm(request.POST, request.FILES)
        if insertion_form.is_valid():
            print(request.POST)
            insertion = insertion_form.save()
            return HttpResponseRedirect(f'/insertions/{insertion.id}/boxes/add/')
        else: return HttpResponseBadRequest("Something went wrong with the data supplied")
    else: return HttpResponseBadRequest("Bad request")

def show(request, insertion_id):
    insertion = Insertion.objects.get(id=insertion_id)
    boxes = Box.objects.filter(insertion_id=insertion.id)
    context = {}
    context['insertion'] = insertion
    context['boxes'] = boxes
    return render(request, 'views/show.html', context)

def edit(request, insertion_id):
    context = {}
    context['insertion'] = Insertion.objects.get(id=insertion_id)
    return render(request, 'views/edit.html', context)

def add_boxes(request, insertion_id):
    if request.method == 'GET':
        context = {}
        box_form = BoxForm()
        context['insertion_id'] = insertion_id
        context['box_form'] = box_form
        return render(request, 'views/add_boxes.html', context)
    if request.method == 'POST':
        box_form = BoxForm(request.POST)
        if box_form.is_valid():
            print(request.POST)
            box = box_form.save(commit=False)
            box.insertion = Insertion.objects.get(id=insertion_id)
            box_form.save()
        return HttpResponseRedirect('/insertions/')
    else: return HttpResponseBadRequest("Bad request")

def boxes(request, insertion_id):
    return HttpResponse("Page currently not available")

def delete(request, insertion_id):
    insertion = Insertion.objects.get(id=insertion_id)
    insertion.image.delete()
    insertion.delete()
    return HttpResponseRedirect('/insertions/')