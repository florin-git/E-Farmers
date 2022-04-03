from dataclasses import fields
from rest_framework import serializers
from .models import *
from datetime import date

class InsertionSerializer(serializers.ModelSerializer):
    # Check that the expiration date is not in the past
    def validate_expiration_date(self, expiration_date):
        today = date.today()

        if expiration_date < today:    
            raise serializers.ValidationError("The expiration date cannot be in the past!")
        return expiration_date
    
    class Meta:
        model = Insertion
        fields = '__all__' # Get all fields

class BoxSerializer(serializers.ModelSerializer):
    # size = forms.ChoiceField(choices=BOX_SIZES, label="Size", initial='', widget=forms.Select(), required=True)
    # def __init__(self, insertion_id, *args, **kwargs):
    #     super(BoxSerializer, self).__init__(*args, **kwargs)

    #     # self.insertion = Insertion.objects.get(id=insertion_id)

    #     boxes = Box.objects.filter(insertion_id=insertion_id)
    #     # print(boxes)
    #     sizes = []
    #     for box in boxes:
    #         sizes.append(BOX_SIZES[box.size][0])
    #     self.fields['size'].choices = tuple(choice for choice in BOX_SIZES if choice[0] not in sizes)
    
    class Meta:
        model = Box
        fields = '__all__' # Get all fields
        # fields = ['weight', 'size', 'price', 'number_of_available_boxes']


        
    