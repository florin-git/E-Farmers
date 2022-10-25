from rest_framework import serializers
from .models import *
from datetime import date

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
    
    def update(self, instance, validated_data):
        # Update boxes list with the new one
        instance.boxes.append(validated_data['boxes'][0])
        
        instance.save()
        return instance