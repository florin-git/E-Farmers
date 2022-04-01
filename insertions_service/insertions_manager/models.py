from typing_extensions import Required
from djongo import models
from django import forms
from django.forms import ModelForm, DateInput
from datetime import datetime
from insertions_manager.box_sizes import *
from django.core.validators import MinValueValidator
from django.utils.translation import gettext_lazy as _

class Insertion(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    expiration_date = models.DateField()
    gathering_location = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='images/', blank=True)
    reported = models.BooleanField(default=False)

class Box(models.Model):
    insertion = models.ForeignKey(Insertion, on_delete=models.CASCADE)
    weight = models.DecimalField(default=0.0, decimal_places=3, max_digits=6, validators=[MinValueValidator(0)])
    size = models.IntegerField(choices=BOX_SIZES, default=0)
    price = models.DecimalField(default=0.0, decimal_places=2, max_digits=5, validators=[MinValueValidator(0)])
    number_of_available_boxes = models.IntegerField(default=0, validators=[MinValueValidator(0)])

class InsertionForm(ModelForm):
    class Meta:
        model = Insertion
        fields = ['title', 'description', 'expiration_date', 'gathering_location', 'image']
        widgets = {
            'expiration_date': forms.widgets.DateInput(attrs={'type': 'date', 'min': datetime.today().strftime('%Y-%m-%d')}),
        }

class BoxForm(ModelForm):
    size = forms.ChoiceField(choices=BOX_SIZES, label="Size", initial='', widget=forms.Select(), required=True)
    
    def __init__(self, insertion_id, *args, **kwargs):
        insertion = Insertion.objects.get(id=insertion_id)
        super(BoxForm, self).__init__(*args, **kwargs)
        boxes = Box.objects.filter(insertion_id=insertion_id)
        sizes = []
        for box in boxes:
            sizes.append(BOX_SIZES[box.size][0])
        self.fields['size'].choices = tuple(choice for choice in BOX_SIZES if choice[0] not in sizes)
    
    class Meta:
        model = Box
        fields = ['weight', 'size', 'price', 'number_of_available_boxes']
        labels = {
            'weight': _('Weight (kg)'),
            'price': _('Price (€)'),
        }
        widgets = {
            'weight': forms.NumberInput(attrs={'min': '0'}),
            'price': forms.NumberInput(attrs={'min': '0'}),
            'number_of_available_boxes': forms.NumberInput(attrs={'min': '0'}),
        }