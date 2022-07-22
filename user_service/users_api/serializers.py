from dataclasses import field
from rest_framework import serializers
from .models import *


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
