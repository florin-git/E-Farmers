from dataclasses import field
from wsgiref import validate
from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.state import token_backend


from rest_framework.fields import CurrentUserDefault

class OrderSerializer(serializers.ModelSerializer):

    external_user_f = serializers.PrimaryKeyRelatedField(many = False, read_only = True)

    class Meta:

        model = Order
        fields = ('order_ID','amount','description','phone_number','billing_address','shipping_address','external_user_f') # Get all fields
        

    def create(self, validated_data):

        order = Order.objects.create(**validated_data)
        order.save()

        return order

class CustomTokenRefreshSerializer(TokenRefreshSerializer):  

    def validate(self, attrs):

        data = super(CustomTokenRefreshSerializer, self).validate(attrs)
        decoded_payload = token_backend.decode(data['access'], verify=True)
        user_id = decoded_payload['user_id']
        
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user)

        # Add user data besides the tokens
        data.update(serializer.data)
        return data