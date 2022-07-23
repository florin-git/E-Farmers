from dataclasses import field
from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.state import token_backend

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = '__all__' # Get all fields
        fields = ('id', 'email', 'password', 'account_type')

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