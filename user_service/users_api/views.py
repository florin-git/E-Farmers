from .models import *
from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, NotAcceptable
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import *


class RegisterView(APIView):
	def post(self, request):
		try:
			serializer = UserSerializer(data=request.data)
			if serializer.is_valid(raise_exception=True):
				serializer.save()
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		except Exception as e:
			raise NotAcceptable(detail="Email already used", code=406) from e

		

class LoginView(APIView):
	def post(self, request):
		email = request.data['email']
		password = request.data['password']

		user = User.objects.filter(email=email).first()

		if user is None:
			raise AuthenticationFailed("User not found")

		if not user.check_password(password):
			raise AuthenticationFailed("Incorrect Password")

		# When the login is successful, user's info is returned
		serializer = UserSerializer(user)
		return Response(serializer.data, status=status.HTTP_200_OK)

class BlacklistTokenView(APIView):
	def post(self, request):
		try:
			refresh_token = request.data['refresh_token']
			token = RefreshToken(refresh_token)
			token.blacklist()
			return Response({
				'message': "successful logout"
			})
		except Exception as e:
			return Response(status=status.HTTP_400_BAD_REQUEST)

