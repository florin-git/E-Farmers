from errno import ESTALE
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
            user_serializer = UserSerializer(user)

            if user_serializer.data["id"] != user_id:
                # The token is associated with another user
                raise PermissionDenied("Access denied!", code=403)

            serializers = [user_serializer.data]
            account_type = user_serializer.data["account_type"]

            if account_type == 1:
                farmer = Farmer.objects.get(ext_user=user_id)
                farmer_serializer = FarmerSerializer(farmer)

                serializers.append(farmer_serializer.data)

            elif account_type == 2:
                rider = Rider.objects.get(ext_user=user_id)
                rider_serializer = RiderSerializer(rider)

                serializers.append(rider_serializer.data)

            return Response(serializers, status=status.HTTP_200_OK)

        # The token was not passed into the header request
        raise PermissionDenied("No token in the header!", code=403)
   
    # POST /api/users/<int:id>/<int:type>
    def user_update(self, request, user_id=None, type=None):
        JWT_authenticator = JWTAuthentication()
        # Authenticate the token in the Authorization header
        JWT_authenticator.authenticate(request)
        user = User.objects.get(id=user_id)
        # We use the parameter type to differentiate the user choose . Passed via url by
        if(type == 1):
            print("Sono un fottuto farmer")
            serializer_farmer = FarmerSerializer(data=request.data)
            if serializer_farmer.is_valid(raise_exception=True):
                serializer_farmer.save()
                serializer_farmer.save(ext_user=user)
                try:
                    rider = Rider.objects.get(ext_user_id=user_id)
                    rider.delete()
                except Exception:
                    print("rider con il corrispettivo id non trovato no delete.")

                return Response(serializer_farmer.data, status=status.HTTP_201_CREATED)
        else:
            print("Sono un fottuto rider")
            serializer = RiderSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                serializer.save(ext_user=user)
                try:
                    farmer = Farmer.objects.filter(ext_user_id=user_id)
                    farmer.delete()
                except Exception:
                    print("farmer con il corrispettivo id non trovato no delete.")

                return Response(serializer.data, status=status.HTTP_201_CREATED)

    def account_change(self, request, user_id=None):  # PATCH /api/users/<int:id>/
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(
            instance=user, data=request.data, partial=True)
        #serializer = UserSerializer(user, data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_farmer(self, request, user_id=None):  # GET /api/farmer/<int:user_id>/
        
        farmer = Farmer.objects.get(ext_user_id=user_id)
        farmer_serializer = FarmerSerializer(farmer)

        user_id = farmer.ext_user_id
        user = User.objects.get(id=user_id)
        user_serializer = UserSerializer(user)
        #print(user_serializer.data)

        return Response({
            'user_id': user_serializer.data['id'],
            'name': user_serializer.data['name'],
            'last_name': user_serializer.data['last_name'],
            'email': user_serializer.data['email'],
            'phone_number': user_serializer.data['phone_number'],
            'farm_location': farmer_serializer.data['farm_location'],
            'bio': farmer_serializer.data['bio'],
        },
            status=status.HTTP_200_OK)
    
    def get_rider(self, request, user_id=None): #GET /api/riders/<int:user_id>

        rider = Rider.objects.get(ext_user_id=user_id)
        rider_serializer = RiderSerializer(rider)

        user_id = rider.ext_user_id
        user = User.objects.get(id=user_id)
        user_serializer = UserSerializer(user)

        return Response({
            'user_id': user_serializer.data['id'],
            'name': user_serializer.data['name'],
            'last_name': user_serializer.data['last_name'],
            'email': user_serializer.data['email'],
            'phone_number': user_serializer.data['phone_number'],
            'avalaible': rider_serializer.data['avalaible'],
            'bio': rider_serializer.data['bio'],
        },
            status=status.HTTP_200_OK)

    def change_status(self, request, user_id=None):  # PATCH /api/riders/<int:id>/
        print(request.data)
        rider = Rider.objects.get(ext_user_id=user_id)
        serializer = RiderSerializer(
            instance=rider, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def add_review(self, request, farmer_id=None):  # POST /api/farmer/<int:farmer_id>/

        farmer = Farmer.objects.get(id=farmer_id)
        review_serializer = ReviewSerializer(data=request.data)

        if review_serializer.is_valid(raise_exception=True):
            # review_serializer.save()
            review_serializer.save(ext_farmer=farmer)
            print(farmer)
            return Response(review_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("ERROR HERE")


class CustomTokenVerifyView(APIView):
    def post(self, request):  # POST /api/token/verify/
        JWT_authenticator = JWTAuthentication()
        # Authenticate the token in the Authorization header
        response = JWT_authenticator.authenticate(request)

        if response is not None:
            # Unpacking
            user, token = response
            serializer = UserSerializer(user)
            # print("this is decoded token claims", token.payload)

            if serializer.data["id"] == request.data['user_id']:
                return Response(status=status.HTTP_200_OK)

            else:
                # The token is associated with another user
                raise PermissionDenied("Access denied!", code=403)

        # The token was not passed into the header request
        raise PermissionDenied("No token in the header!", code=403)


class CustomTokenVerifyView(APIView):
    def post(self, request): # POST /api/token/verify/
        JWT_authenticator = JWTAuthentication()
        # Authenticate the token in the Authorization header
        response = JWT_authenticator.authenticate(request)

        if response is not None:
            # Unpacking
            user, token = response
            serializer = UserSerializer(user)
            # print("this is decoded token claims", token.payload)

            if serializer.data["id"] == request.data['user_id']:
                return Response(status=status.HTTP_200_OK)

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
            return "ok"
            # Response(status=status.HTTP_400_BAD_REQUEST)


class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer
