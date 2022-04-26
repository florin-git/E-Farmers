from rest_framework import serializers
from .models import *
from datetime import date

class InsertionSerializer(serializers.ModelSerializer):
    """
    Check that the expiration date is not in the past
    """
    def validate_expiration_date(self, expiration_date):
        today = date.today()

        if expiration_date < today:    
            raise serializers.ValidationError("The expiration date cannot be in the past!")
        return expiration_date
    
    class Meta:
        model = Insertion
        fields = '__all__' # Get all fields

class BoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Box
        fields = '__all__' # Get all fields
        # fields = ['weight', 'size', 'price', 'number_of_available_boxes']


        
    