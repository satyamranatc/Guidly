from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


from .jwt_utils import *
from .utils import *


from .serializer import *

from .db import users_collection
from .utils import hash_password


@api_view(['POST'])
def RegisterView(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        
        newUser = users_collection.insert_one({
            "name": data['name'],
            "avatar": data['avatar'],
            "email": data['email'],
            "password": hash_password(data['password'])
        })
        
        if newUser:

            acess_Token = generate_access_token({"email": data['email']})
            refresh_Token = generate_refresh_token({"email":data["email"]})
            
            return Response({
                "message": "User Registered Successfully",
                "refresh_token": refresh_Token,
                "access_token": acess_Token
                }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                "message": "User Registration Failed",
                "data": serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)        
    else:
        return Response({
            "message": "Invalid Data",
            "data": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        
        

@api_view(['POST'])
def LoginView(request):
    email = request.data['email']
    password = request.data['password']
    
    user = users_collection.find_one({"email": email})
    
    if user:
        if check_password(password, user['password']):
            acess_Token = generate_access_token({"email": email})
            refresh_Token = generate_refresh_token({"email":email})
            
            return Response({
                "message": "User Logged In Successfully",
                "refresh_token": refresh_Token,
                "access_token": acess_Token
                }, status=status.HTTP_200_OK)
        else:
            return Response({
                "message": "Invalid Password"
                }, status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['GET'])
def UserDetails(request):
    
   if 'Authorization' not in request.headers:
      return Response({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED) 
    
   token = request.headers['Authorization'].split(" ")[1]
   
   if token == "null":
      return Response({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED) 
   
   email = extract_email(token)
   print("-----------------------")
   print(email)
   print("-----------------------")
   
   
   user = users_collection.find_one({"email": email})
   
   if user:
      return Response({
          "message": "User Found",
          "id": str(user['_id']),
          "name": user['name'],
          "avatar": user['avatar'],
          "email": user['email']  
          }, status=status.HTTP_200_OK)
   else:
      return Response({"message": "User Not Found"}, status=status.HTTP_404_NOT_FOUND)
    
   
   