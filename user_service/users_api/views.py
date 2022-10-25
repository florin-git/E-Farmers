from .models import *
from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied, NotAcceptable
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import *
from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework_simplejwt.views import TokenRefreshView


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("User not found", code=401)

        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect Password", code=401)

        # When the login is successful, user's info is returned
        serializer = UserSerializer(user)

        # Return user_id and type_account for frontend
        return Response({
            'user_id': serializer.data['id'],
            'account_type': serializer.data['account_type']
        },
            status=status.HTTP_200_OK)


class UsersView(viewsets.ViewSet):

    def list_users(self, request):  # GET /api/users/
        """
        Return all the users.
        """
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def register_user(self, request):  # POST /api/users/
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception:
            if serializer.errors['email'][0] == "user with this Email already exists.":
                return Response("Email already used", status=status.HTTP_406_NOT_ACCEPTABLE)

            

    def user_info(self, request, user_id=None):  # GET /api/users/<int:id>/
        JWT_authenticator = JWTAuthentication()
        # Authenticate the token in the Authorization header
        response = JWT_authenticator.authenticate(request)

        if response is not None:
            # Unpacking
            user, token = response
            serializer = UserSerializer(user)
            # print("this is decoded token claims", token.payload)

            if serializer.data["id"] == user_id:
                return Response(serializer.data, status=status.HTTP_200_OK)

            else:
                # The token is associated with another user
                raise PermissionDenied("Access denied!", code=403)

        # The token was not passed into the header request
        raise PermissionDenied("No token in the header!", code=403)


class BlacklistTokenView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({
                'message': "successful logout"
            })
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer
