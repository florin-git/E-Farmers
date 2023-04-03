from dataclasses import field
from wsgiref import validate
from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.state import token_backend


from rest_framework.fields import CurrentUserDefault

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__' # Get all fields
        #fields = ('id', 'name', 'email', 'password', 'account_type')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            # Hash the password
            instance.set_password(password)

        instance.save()
        return instance

    def update(self, instance, validated_data):
        instance.account_type = validated_data.get( 'account_type' , instance.account_type )
        instance.save()
        return instance   
    

class FarmerSerializer(serializers.ModelSerializer):
    #get all the field of the nested user

    #this give us the error NameError at /api/users/1/\nname 'user' is not defined\
    #ext_user = UserSerializer()                                 
    external_user_f = serializers.PrimaryKeyRelatedField(many = False, read_only = True)
    
    #User = UserSerializer()
    class Meta:
        model = Farmer
        #fields = '__all__' # Get all fields
        fields = ('id','farm_location','bio','external_user_f', 'number_insertions', 'since')
        #read_only_fields = ('ext_user')
        #fields = ('farm_location','bio')
        

    def create(self, validated_data):
        #farmer = Farmer(**validated_data)
        #farmer.id = instance.id
        #farmer.user_id = CurrentUserDefault()
        #farmer = Farmer.objects.create(**instance, user_id=validated_data)
        #farmer.save()
        #return farmer
        
        #user_id = instance.id
        #validated_data["user_id"] = User.objects.create(id=user_id)
        farmer = Farmer.objects.create(**validated_data)
        return farmer



class RiderSerializer(serializers.ModelSerializer):
    external_user_r = serializers.PrimaryKeyRelatedField(many = False, read_only = True)
    
    class Meta:
        model = Rider
        fields = ('id','available','bio','external_user_r')
    
    def create(self,validated_data):
        rider = Rider.objects.create(**validated_data)
        return rider
    
    def update(self, instance, validated_data):
        instance.avalaible = validated_data.get( 'avalaible' , instance.avalaible )
        instance.save()
        return instance   

class ReviewSerializer(serializers.ModelSerializer):

    # ADD HERE FARMER KEY
    #external_farmer = serializers.PrimaryKeyRelatedField(many = False , read_only = True)

    class Meta:
        model= Review
        fields= ('id','rating','comment','ext_farmer')

    def create(self, validated_data):
        review = Review.objects.create(**validated_data)
        return review


   

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