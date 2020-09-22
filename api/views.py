from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import response, decorators, permissions, status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

# @decorators.permission_classes([permissions.AllowAny])
# @authentication_classes([JWTAuthentication])
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def apiOverview(request):
    api_urls = {
        'ItemCartAll':'/api/cart-item-all-list',
        'ItemCartUnpaid': '/api/cart-item-unpaid-list',
        'ItemCartPaid': '/api/cart-item-paid-list',
        'CartCreate': '/api/cart-create',
        'ProductsList': '/api/products-list',
    }
    return Response(api_urls)


# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def cart_item_list(request):
    cart_items = CartItem.objects.all()
    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def cart_item_unpaid_list(request):
    cart_items = CartItem.objects.filter(status="U")
    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def cart_item_paid_list(request):
    cart_items = CartItem.objects.filter(status="P")
    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def cart_create(request):
    customer = Customer.objects.get(user=User.objects.get(username=request.user.username))
    existing_cart = Cart.objects.filter(customer=customer, status="U")
    if existing_cart:
        # while uppdating, check if Order exist in the db, if yes then update order too
        serializer = CartSerializer(existing_cart[0], data=request.data, context={'request': request})
    else:
        serializer = CartSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors)
    return Response("Success")



@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def products_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def cart_get(request):
    customer = Customer.objects.get(user=User.objects.get(username=request.user.username))
    cart = Cart.objects.filter(customer=customer)
    if cart:
        cart_serializer = CartSerializer(cart[0])
        return Response(cart_serializer.data)
    else:
        return Response({})

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # import pdb;pdb.set_trace()
        token = super().get_token(user)
        # Add custom claims
        token['name'] = user.username
        # ...

        return token

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register(request):
    data = {}
    serializer = CustomerSerializer(data=request.data)
    if serializer.is_valid(raise_exception=False):
        account = serializer.save()
        data['username'] = account.username
        data['response'] = "Account created successfully"
        data['token'] = get_tokens_for_user(account)
    else:
        data = serializer.errors
    return Response(data)

# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def ship_addr_get(request):
    customer = Customer.objects.get(user=User.objects.get(username=request.user.username))
    shipping_addr = ShippingAddress.objects.filter(customer=customer)
    if shipping_addr:
        serializer = ShippingAddressSerializer(shipping_addr)
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    else:
        return Response({})


@api_view(['POST'])
def ship_addr_create(request):
    customer = Customer.objects.get(user=User.objects.get(username=request.user.username))
    cart = Cart.objects.filter(customer=customer, status="U")
    if cart:
        s_addr = ShippingAddress.objects.filter(customer=customer, cart=cart[0])
        if s_addr:
            serializer = ShippingAddressSerializer(instance=s_addr[0], data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors)
        else:
            serializer = ShippingAddressSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors)
    else:
        Response({"error":"Cart Not Created"})


# this is to check token is correct or not
class Protected(APIView):
    def get(self, request):
        return Response(data={'type': 'protected'})

protected = Protected.as_view()


