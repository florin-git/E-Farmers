import requests
from .models import *
from .serializers import *
from datetime import date

from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied, NotAcceptable
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication


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

    def user_name(self, request, user_id=None): # GET /api/users/<int:user_id>/name/
        user = User.objects.get(id=user_id)
        user_serializer = UserSerializer(user)

        return Response(user_serializer.data['name'], status=status.HTTP_200_OK)


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
                farmer = Farmer.objects.get(ext_user_id=user_id)
                farmer_serializer = FarmerSerializer(farmer)
                serializers.append(farmer_serializer.data)

            elif account_type == 2:
                rider = Rider.objects.get(ext_user_id=user_id)
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
        if type == 1:
            serializer_farmer = FarmerSerializer(data=request.data)
            if serializer_farmer.is_valid(raise_exception=True):
                serializer_farmer.save(ext_user=user)
                serializer_farmer.save(since=timezone.now().date())
                serializer_farmer.save()
                
                return Response(serializer_farmer.data, status=status.HTTP_201_CREATED)
        else:
            serializer_rider = RiderSerializer(data=request.data)
            if serializer_rider.is_valid(raise_exception=True):
                serializer_rider.save(ext_user=user)
                serializer_rider.save()
                #try:
                #    farmer = Farmer.objects.filter(ext_user_id=user_id)
                #    farmer.delete()
                #except Exception:
                #    print("farmer con il corrispettivo id non trovato no delete.")
                return Response(serializer_rider.data, status=status.HTTP_201_CREATED)

    def account_change(self, request, user_id=None):  # PATCH /api/users/<int:id>/
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(instance=user, data=request.data, partial=True)
        #serializer = UserSerializer(user, data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_farmer(self, request, user_id=None):  # GET /api/farmers/<int:user_id>/
        
        farmer = Farmer.objects.get(ext_user_id=user_id)
        farmer_serializer = FarmerSerializer(farmer)

        #* Check
        # user_id = farmer.ext_user_id 
        ###

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
            'number_insertions': farmer_serializer.data['number_insertions'],
            'since': farmer_serializer.data['since'],
        },
            status=status.HTTP_200_OK)
    
    def increase_number_insertions(self, request, user_id): # PATCH /api/farmer/<int:user_id>/
        farmer = Farmer.objects.get(ext_user_id=user_id)
        farmer.number_insertions = farmer.number_insertions +1
        farmer.save()
        return Response(status=status.HTTP_200_OK)

    
    def get_rider(self, request, user_id=None): #GET /api/riders/<int:user_id>

        rider = Rider.objects.get(ext_user_id=user_id)
        rider_serializer = RiderSerializer(rider)
        # user_id = rider.ext_user_id
        user = User.objects.get(id=user_id)
        user_serializer = UserSerializer(user)

        return Response({
            'user_id': user_serializer.data['id'],
            'name': user_serializer.data['name'],
            'last_name': user_serializer.data['last_name'],
            'email': user_serializer.data['email'],
            'phone_number': user_serializer.data['phone_number'],
            'available': rider_serializer.data['available'],
            'bio': rider_serializer.data['bio'],
        },
            status=status.HTTP_200_OK)
    
    def get_first_rider(self, request): #GET /api/riders/
        rider = None

        try:
            rider = Rider.objects.filter(available=True).first()
            # rider_serializer = RiderSerializer(rider)
        except rider is not None: #Rider.DoesNotExist:   
            return Response({'error': 'Rider not found'}, status=404)
        
        if rider is None:
            return Response({'error': 'Rider not found'}, status=404)
        else:
            return Response(rider.ext_user_id, status=status.HTTP_200_OK)

    def change_status(self, request, user_id=None):  # PATCH /api/riders/<int:id>/
        rider = Rider.objects.get(ext_user_id=user_id)
        serializer = RiderSerializer(instance=rider, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def add_review(self, request, user_id=None):  # POST /api/review/<int:user_id>/

        user = User.objects.get(id=user_id)
        review_serializer = ReviewSerializer(data=request.data)

        if review_serializer.is_valid(raise_exception=True):
            # review_serializer.save()
            review_serializer.save(writer_user=user)
            return Response(review_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("ERROR HERE")

    def retrieve_review(self, request, user_id=None) :  #GET /api/review/<int:user_id>/
        review = Review.objects.filter(farmer_user=user_id).last()
        review_serializer = ReviewSerializer(review)

        return Response({
                'rating': review_serializer.data['rating'],
                'comment': review_serializer.data['comment'],
                'writer_user': review_serializer.data['writer_user'],
            },
            status=status.HTTP_200_OK)
       

    def change_profile(self, request, user_id = None ): # PATCH /api/users/<int:user_id>/changes/
        user = User.objects.get(id=user_id)
        user_params = {}
        farmer_params = {}
        rider_params = {}

        # Extract params for user
        user_params['name'] = request.data.get('name', None)
        user_params['email'] = request.data.get('email', None)
        user_params['account_type'] = request.data.get('account_type', None)
        user_params['billing_address'] = request.data.get('billing_address', None)
        user_params['shipping_address'] = request.data.get('shipping_address', None)
        user_params['phone_number'] = request.data.get('phone_number', None)

        # Extract params for farmer
        farmer_params['bio'] = request.data.get('bio', None)
        farmer_params['farm_location'] = request.data.get('farm_location', None)

        # Extract params for rider
        rider_params['bio'] = request.data.get('bio', None)

        if request.data['account_type'] == 1:
            farmer = Farmer.objects.get(ext_user_id=user_id)
            serializer_farmer = FarmerSerializer(instance = farmer, data=farmer_params, partial=True)
            if serializer_farmer.is_valid(raise_exception=True):
                serializer_farmer.save()
        elif request.data['account_type'] == 2:
            rider = Rider.objects.get(ext_user_id=user_id)
            serializer_rider = RiderSerializer(instance = rider, data=rider_params, partial=True)
            if serializer_rider.is_valid(raise_exception=True):
                serializer_rider.save()

        serializer = UserSerializer(instance=user, data=user_params, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


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


class OAuthTokenObtainPairView(TokenObtainPairView):
    def post(self, request):
        # Get the access token from the request data
        access_token = request.data.get('access_token')

        # Make a request to the Google OAuth userinfo endpoint to get the user's email
        response = requests.get(
            f'https://oauth2.googleapis.com/tokeninfo?id_token={access_token}').json()
        email = response['email']

        # Check if a user with the given email already exists in the database
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Create a new user with a random password
            password = User.objects.make_random_password()

            # TODO: If we add other attributes we should add them here
            serializer = UserSerializer(
                data={"email": email, "password": password, "name": response['name']})
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                user = User.objects.get(email=email)

        # Generate a refresh token for the user
        refresh = RefreshToken.for_user(user)
        serializer = UserSerializer(user)

        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_id': serializer.data["id"],
            'account_type': serializer.data['account_type'],
        }
        return Response(data, status=200)
