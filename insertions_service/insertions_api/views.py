from .models import *
# from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import *
from django.http import HttpResponse

###
#* Insertions
###
class InsertionsView(viewsets.ViewSet):
    def list_insertions(self, request): # GET /api/insertions/
        """
        Return all the insertions.
        """
        insertions = Insertion.objects.all()
        serializer = InsertionSerializer(insertions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def publish_insertion(self, request): # POST /api/insertions/
        serializer = InsertionSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve_insertion(self, request, insertion_id=None): # GET /api/insertions/<int:id>
        insertion = Insertion.objects.get(id=insertion_id)
        serializer = InsertionSerializer(insertion)
        return Response(serializer.data)

    def retrieve_insertion_image(self, request, insertion_id=None): # GET /api/insertions/<int:id>
        insertion = Insertion.objects.get(id=insertion_id)
        filename = "media/" + insertion.image.name
        print("Result: ", filename)
        # image = UploadedFile(file=Image.open(filename))
        # image = Image.open(filename)
        try:
            with open(filename, "rb") as f:
                return HttpResponse(f.read(), content_type="image/jpeg")
        except IOError:
            red = Image.new('RGBA', (1, 1), (255,0,0,0))
            response = HttpResponse(content_type="image/jpeg")
            red.save(response, "JPEG")
            return response

        return Response(image)

    def update_insertion(self, request, insertion_id=None): # PUT /api/insertions/<int:id>
        insertion = Insertion.objects.get(id=insertion_id)  
        serializer = InsertionSerializer(instance=insertion, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def delete_insertion(self, request, insertion_id=None): # DELETE /api/insertions/<int:id>
        insertion = Insertion.objects.get(id=insertion_id)
        insertion.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

###
#* Boxes
###
class BoxesView(viewsets.ViewSet):
    def list_insertion_boxes(self, request, insertion_id=None): # GET /api/insertions/<int:id>/boxes
        """
        Return all the boxes related to the insertion
        with that insertion_id, sorted by size
        """
        boxes = Box.objects.filter(insertion_id=insertion_id).order_by('size')

        serializer = BoxSerializer(boxes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def add_boxes(self, request, insertion_id=None): # POST /api/insertions/<int:id>/boxes
        serializer = BoxSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

