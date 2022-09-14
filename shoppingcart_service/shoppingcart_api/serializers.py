from rest_framework import serializers
from .models import *
from datetime import date

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'