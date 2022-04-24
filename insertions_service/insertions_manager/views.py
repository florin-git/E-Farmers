from multiprocessing import context
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect
from djongo import *
from .models import *
# from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializer import *
from insertions_manager import serializer

###
# Insertions
###
class InsertionsView(viewsets.ViewSet):
    def list_insertions(self, request): # GET /api/insertions
        """
        Return a list of all the insertions.
        """
        insertions = Insertion.objects.all()
        serializer = InsertionSerializer(insertions, many=True)
        return Response(serializer.data)

    def publish_insertion(self, request): # POST /api/insertions
        serializer = InsertionSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve_insertion(self, request, insertion_id=None): # GET /api/insertions/<str:id>
        insertion = Insertion.objects.get(id=insertion_id)
        serializer = InsertionSerializer(insertion)
        return Response(serializer.data)

    def update_insertion(self, request, insertion_id=None): # PUT /api/insertions/<str:id>
        insertion = Insertion.objects.get(id=insertion_id)  
        serializer = InsertionSerializer(instance=insertion, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def delete_insertion(self, request, insertion_id=None): # DELETE /api/insertions/<str:id>
        insertion = Insertion.objects.get(id=insertion_id)
        insertion.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


###
# Boxes
###
class BoxesView(viewsets.ViewSet):
    def list_insertion_boxes(self, request, insertion_id=None): # GET /api/insertions/<str:id>/boxes
        """
        Return all the boxes related to the insertion
        with that insertion_id
        """
        boxes = Box.objects.filter(insertion_id=insertion_id)
        serializer = BoxSerializer(boxes, many=True)
        return Response(serializer.data)

    def add_boxes(self, request, insertion_id=None): # POST /api/insertions/<str:id>/boxes
        serializer = BoxSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            # serializer.insertion = Insertion.objects.get(id=insertion_id)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
