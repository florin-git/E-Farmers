from operator import truediv
import stripe
import json
from django.http import JsonResponse
from django.conf import settings
from rest_framework import viewsets,status
from rest_framework.response import Response
from .models import *
from .serializers import *


stripe.api_key = settings.STRIPE_SECRET_KEY


class NewView(viewsets.ViewSet):
    
    ## forse da cancellare
    def test_payment(self,request):  #POST
        test_payment_intent = stripe.PaymentIntent.create(
            amount=1000, currency='usd', 
            payment_method_types=['card'],
            receipt_email='test@example.com'
        )

        return Response(status=status.HTTP_200_OK, data=test_payment_intent)


    def save_stripe_info(self,request): #POST
        # data
        data = request.data
        email = data['email']
        payment_method_id = data['payment_method_id']
        extra_msg = ''
        customer_data = stripe.Customer.list(email=email).data
        
        # Check if customer already exists
        if len(customer_data) == 0:
            # creating customer
            customer = stripe.Customer.create(
            email=email, payment_method=payment_method_id)
        else:
            customer = customer_data[0]
            extra_msg = "Customer already exist."
            stripe.PaymentIntent.create(
                customer = customer, 
                payment_method = payment_method_id,  
                currency = 'eur', # you can provide any currency you want
                amount= str(int(float(request.data['price']) * 100)),
                confirm = True
            )     
            try:
                
                serializer = OrdersSerializer(data = request.data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data,status=status.HTTP_201_CREATED)
            except Exception:
                return Response(status = status.HTTP_406_NOT_ACCEPTABLE)

        return Response(status=status.HTTP_200_OK, 
            data={
                'message': 'Success', 
                'data': {'customer_id': customer.id},
                'extra_msg': extra_msg  
            }
        )

    def getOrders(self, request, email=None):     #GET /api/orders/<str:email>/
        orders = Orders.objects.filter(email = email)
        serializer = OrdersSerializer(orders, many = True)
        return Response(serializer.data, status.HTTP_200_OK)

    def getSpecificOrder(self,request,payment_method_id=None):  #GET /api/orders/<str:payment_method_id>/
        try:
            order = Orders.objects.get(payment_method_id = payment_method_id)
        except Orders.DoesNotExist:
            return Response("Object not found", status.HTTP_400_BAD_REQUEST)
        else:
            order_serializer = OrdersSerializer(order)
            return Response (order_serializer.data, status.HTTP_200_OK)
        
    def getSpecificOrderByRider(self, request, rider_id=None):  #GET /api/orders/<int:rider_id>/
        try:
            order = Orders.objects.get(rider=rider_id)
        except Orders.DoesNotExist:
            return Response("Object not found", status.HTTP_400_BAD_REQUEST)
        else:
            order_serializer = OrdersSerializer(order)
            return Response (order_serializer.data, status.HTTP_200_OK)

    def updateOrder(self,request): #PATCH /api/update-order
        try: 
            order = Orders.objects.get(payment_method_id = request.data['payment_method_id'])
            riderId = request.data['riderId']
            serializer = OrdersSerializer(instance=order, data={'rider':riderId}, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status.HTTP_200_OK)
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
        except Orders.DoesNotExist:
            return Response({'error': 'Order not found'}, status=404)
        

    def updateStatusRider(self,request): #PATCH /api/update-status-rider
        try: 
            riderId = request.data['riderUserId']
            order = Orders.objects.get(rider=riderId)
            serializer = OrdersSerializer(instance=order, data={'rider': -1}, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status.HTTP_200_OK)
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
        except Orders.DoesNotExist:
            return Response({'error': 'Order not found'}, status=404)

       
