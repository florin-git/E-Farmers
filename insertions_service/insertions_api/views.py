from .models import *
# from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import *
from django.http import HttpResponse
from django.http import QueryDict

###
#* Insertions
###
class InsertionsView(viewsets.ViewSet):
    def list_insertions(self, request): # GET /api/insertions/
        search_params = request.GET.get('search', '')
        expiring_search = request.GET.get('expiring', '')
        farmer_param = None
        try:
            if(request.GET.get('farmer', '') != ''):
                farmer_param = int(request.GET.get('farmer', ''))
        except:
            return Response(None, status=status.HTTP_400_BAD_REQUEST)
        if expiring_search != "":
            today = date.today()
            insertions = Insertion.objects.filter(expiration_date__year=today.year, expiration_date__month=today.month, expiration_date__day=today.day)
            insertions = insertions[:int(expiring_search)]
        elif farmer_param != None:
            insertions = Insertion.objects.filter(farmer=farmer_param)
        elif search_params == "":
            insertions = Insertion.objects.all()
        elif search_params == "expiring_products":
            today = date.today()
            insertions = Insertion.objects.filter(expiration_date__year=today.year, expiration_date__month=today.month, expiration_date__day=today.day)
        else:
            is_first_word = True
            for param in search_params.split():
                if is_first_word:
                    insertions = Insertion.objects.filter(title__icontains=param)
                    is_first_word = False
                else:
                    insertions = (insertions | Insertion.objects.filter(title__icontains=param))
        serializer = InsertionSerializer(insertions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def publish_insertion(self, request): # POST /api/insertions/
        serializer = InsertionSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

            return Response({
                    'insertion_id': serializer.data['id'],
                },
                status=status.HTTP_201_CREATED
            )


    def retrieve_insertion(self, request, insertion_id=None): # GET /api/insertions/<int:id>/
        insertion = Insertion.objects.get(id=insertion_id)
        today = date.today()
        if insertion.expiration_date < today:
            insertion.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        serializer = InsertionSerializer(insertion)
        return Response(serializer.data)

    def retrieve_insertion_image(self, request, insertion_id=None): # GET /api/insertions/<int:id>/image/
        insertion = Insertion.objects.get(id=insertion_id)
        filename = "media/" + insertion.image.name
        print("Result: ", filename)

        try:
            with open(filename, "rb") as f:
                return HttpResponse(f.read(), content_type="image/jpeg")
        except IOError:
            red = Image.new('RGBA', (1, 1), (255,0,0,0))
            response = HttpResponse(content_type="image/jpeg")
            red.save(response, "JPEG")
            return response

    def update_insertion(self, request, insertion_id=None): # PUT /api/insertions/<int:id>/
        insertion = Insertion.objects.get(id=insertion_id)
        today = date.today()
        
        if insertion.expiration_date < today:
            insertion.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        request.data['reported'] = insertion.reported
        request.data['expiration_date'] = insertion.expiration_date
        serializer = InsertionSerializer(instance=insertion, data=request.data)
        try:
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                #insertion.image = request.FILES["image"]
                #insertion.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)

    def delete_insertion(self, request, insertion_id=None): # DELETE /api/insertions/<int:id>/
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

###
#* Booking
###
class BookingView(viewsets.ViewSet):
    def get_request(self, request): # GET /api/booking/<int:request_id>/
        # Return the request specified
        today = date.today()
        request = Request.objects.get(id=int(request.GET.get('request_id', '')))
        if request.deadline < today:
            request.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        serializer = RequestSerializer(request)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def accept_request(self, request): # PUT /api/booking/
        # Set the request's insertion field
        today = date.today()
        # return Response(None, status=status.HTTP_200_OK)
        
        product_request = Request.objects.get(id=int(request.data['id']))
        if product_request.deadline < today:
            request.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        serializer = RequestSerializer(instance=product_request, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def list_booked_products(self, request): # GET /api/booking/requests/<int:user_id>/
        # Returns the list of a user's requests (booked products)
        requests = Request.objects.filter(user=int(request.GET.get('user_id', '')))
        serializer = RequestSerializer(requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def list_requests(self, request): # GET /api/booking/inbox/<int:farmer_id>/
        # Returns the list of a farmer's requests received by users
        list_of_requests = Request.objects.filter(farmer=int(request.GET.get('farmer_id', '')))
        serializer = RequestSerializer(list_of_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def book_product(self, request): # POST /api/booking/
        # Creates a new request
        print(request.data)
        serializer = RequestSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def cancel_booking(self, request): # GET /api/booking/<int:id>
        # Deletes a request
        request_to_be_deleted = Request.objects.get(id=int(request.GET.get('request_id', '')))
        request_to_be_deleted.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)