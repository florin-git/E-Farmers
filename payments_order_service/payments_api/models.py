from django.db import models

# Create your models here.
class Orders(models.Model):
    payment_method_id = models.CharField(max_length=150, default = ' ') #l'id dell'ordine viene generato automaticamente da stripe
    email = models.CharField(max_length=150, default = ' ')
    tot_price = models.DecimalField(default=0.0, decimal_places=2, max_digits=16)
    
    ## CartItem attributes
    #campo_items = array{item@1,item@2}

    def __str__(self):
        return self.payment_method_id

