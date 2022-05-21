from .models import *
from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
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
			'message': "successful login"
		})

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

