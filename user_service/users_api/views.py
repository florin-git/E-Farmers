from .models import *
from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import *


class RegisterView(APIView):
	def post(self, request):
		serializer = UserSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		return Response(serializer.data, status=status.HTTP_201_CREATED)
		

class LoginView(APIView):
	def post(self, request):
		email = request.data['email']
		password = request.data['password']

		user = User.objects.filter(email=email).first()

		if user is None:
			raise AuthenticationFailed("User not found")

		if not user.check_password(password):
			raise AuthenticationFailed("Incorrect Password")

		return Response({
			'message': "success"
		})

