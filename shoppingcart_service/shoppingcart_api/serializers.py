from rest_framework import serializers
from .models import *

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
    
#    def update(self, instance, validated_data):
#        # Update boxes list with the new one
#        instance.boxes.append(validated_data['boxes'][0])
#        
#        instance.save()
#        return instance

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'