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
from django.core.mail import send_mail
import gspread
from google.oauth2.service_account import Credentials
from django.conf import settings
# from .paytm import generate_checksum, verify_checksum
from .paytm import generateSignature, verifySignature
import time
from django.http.response import  HttpResponseRedirect
import razorpay
razorpay_client = razorpay.Client(auth=("rzp_test_FZr9JAeuMX21N3", "7jKyRVptGhZRGisgwHqYvwT2"))
# live credentials
# razorpay_client = razorpay.Client(auth=("rzp_live_jDluDvNNkFYry5", "eaabyhrV0NeE5GgVIbLVvClb"))
scopes = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
]

credentials = Credentials.from_service_account_file(
    'namkeen-1605295049597-233838148291.json',
    scopes=scopes
)

PICKUP_ADDRESS = "130-E Prajapat Nagar, Near Ram Dwar, Dwarkapuri, Indore, 452009"



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
# @permission_classes([permissions.AllowAny])
def cart_create(request):
    # import pdb;pdb.set_trace()
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
    return Response({
        "result":"Success"
    })



@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def products_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
# @permission_classes([permissions.AllowAny])
def cart_get(request):
    customer = Customer.objects.get(user=User.objects.get(username=request.user.username))
    # customer = Customer.objects.get(user=User.objects.get(username="aviuser"))
    cart = Cart.objects.filter(customer=customer, status="U")
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

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def ship_addr_get(request):
    customer = Customer.objects.get(user=User.objects.get(username=request.user.username))
    # customer = Customer.objects.get(user=User.objects.get(username="aviuser"))
    shipping_addr = ShippingAddress.objects.filter(customer=customer)
    if shipping_addr:
        serializer = ShippingAddressSerializer(shipping_addr)
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    else:
        return Response({})

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
# @permission_classes([permissions.AllowAny])
def ship_addr_create(request):
    customer = Customer.objects.get(user=User.objects.get(username=request.user.username))
    # customer = Customer.objects.get(user=User.objects.get(username="aviuser"))
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

# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def test_api(request):
    import datetime
    # customer = Customer.objects.get(user=User.objects.get(username=request.user.username))

    customer = Customer.objects.get(user=User.objects.get(username="aviuser"))
    cart = Cart.objects.filter(customer=customer, status="U")
    total_amount = Cart.objects.get_total_amount(cart[0])
    total_quantity = Cart.objects.get_total_quantity(cart[0])
    s_addr = ShippingAddress.objects.get(customer=customer, cart=cart[0])

    order_model = Order.objects.create(
        customer=customer,
        transaction_id="",
        order_amount=total_amount,
        shipping_address=s_addr,
        order_date=datetime.datetime.today().date(),
        quantity=total_quantity,
        cart=cart[0]
    )
    import pdb;
    pdb.set_trace()
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

'''
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
# @permission_classes([permissions.AllowAny])
def callback(request):
    received_data = dict(request.POST)
    print(request.POST)
    paytm_params = {}
    paytm_checksum = received_data['CHECKSUMHASH'][0]
    for key, value in received_data.items():
        if key == 'CHECKSUMHASH':
            paytm_checksum = value[0]
        else:
            paytm_params[key] = str(value[0])
    # Verify checksum
    is_valid_checksum = verifySignature(paytm_params, settings.PAYTM_SECRET_KEY, str(paytm_checksum))
    if is_valid_checksum:
        print("checksum matched")
        received_data['message'] = "Checksum Matched"
        return HttpResponseRedirect(redirect_to='http://localhost:8000/status/')
        # return Response(received_data)
    else:
        print("checksum not matched")
        return HttpResponseRedirect(redirect_to='http://localhost:8000/status/')
        # return Response(received_data)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
# @permission_classes([permissions.AllowAny])
def payment(request):
    # customer = Customer.objects.get(user=User.objects.get(username=request.user.username))
    # try:
    #     amount = int(request.POST['amount'])
    # except:
    #     return render(request, 'pay.html', context={'error': 'Wrong Accound Details or amount'})
    # transaction = Transaction.objects.create(made_by=user, amount=int(amount))
    # transaction.save()
    merchant_key = str(settings.PAYTM_SECRET_KEY)

    params = (
        ('MID', str(settings.PAYTM_MERCHANT_ID)),
        ('ORDER_ID', str("1603901060")),
        # ('CUST_ID', str(transaction.made_by.email)),
        ('CUST_ID', "1"),
        ('TXN_AMOUNT', str("1003.00")),
        ('CHANNEL_ID', str(settings.PAYTM_CHANNEL_ID)),
        ('WEBSITE', str(settings.PAYTM_WEBSITE)),
        # ('EMAIL', request.user.email),
        # ('MOBILE_N0', '9911223388'),
        ('INDUSTRY_TYPE_ID', str(settings.PAYTM_INDUSTRY_TYPE_ID)),
        ('CALLBACK_URL', str("http://localhost:8001/api/callback/")),
        # ('PAYMENT_MODE_ONLY', 'NO'),
    )
    paytm_params = dict(params)
    checksum = generateSignature(paytm_params, merchant_key)
    l = list()
    for key,value in paytm_params.items():
        l.append((key,value))
    l.append(('CHECKSUMHASH',checksum))
    # import pdb;pdb.set_trace()


    # transaction.checksum = checksum
    # transaction.save()
    # import pdb;pdb.set_trace()
    # paytm_params['CHECKSUMHASH'] = str(checksum)
    # print('SENT:', str(checksum.strip()))
    # print(verify_checksum(
    #     paytm_params, merchant_key,
    #     checksum))
    # print(verifySignature(x, merchant_key, checksum))
    print(dict(l))
    return Response({
        "params":dict(l)
    })
    # return render(request, 'redirect.html', context=paytm_params)

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
# @permission_classes([permissions.AllowAny])
def paymentcashfree(request):
    # customer = Customer.objects.get(user=User.objects.get(username=request.user.username))
    # try:
    #     amount = int(request.POST['amount'])
    # except:
    #     return render(request, 'pay.html', context={'error': 'Wrong Accound Details or amount'})
    # transaction = Transaction.objects.create(made_by=user, amount=int(amount))
    # transaction.save()
    merchant_key = str(settings.PAYTM_SECRET_KEY)

    params = (
        ('MID', str(settings.PAYTM_MERCHANT_ID)),
        ('ORDER_ID', str("1603991067")),
        # ('CUST_ID', str(transaction.made_by.email)),
        ('CUST_ID', "1"),
        ('TXN_AMOUNT', str("1002.00")),
        ('CHANNEL_ID', str(settings.PAYTM_CHANNEL_ID)),
        ('WEBSITE', str(settings.PAYTM_WEBSITE)),
        # ('EMAIL', request.user.email),
        # ('MOBILE_N0', '9911223388'),
        ('INDUSTRY_TYPE_ID', str(settings.PAYTM_INDUSTRY_TYPE_ID)),
        ('CALLBACK_URL', str("https://securegw-stage.paytm.in/theia/paytmCallback")),
        # ('PAYMENT_MODE_ONLY', 'NO'),
    )
    paytm_params = dict(params)
    checksum = generateSignature(paytm_params, merchant_key)
    l = list()
    for key,value in paytm_params.items():
        l.append((key,value))
    l.append(('CHECKSUMHASH',checksum))
    # import pdb;pdb.set_trace()


    # transaction.checksum = checksum
    # transaction.save()
    # import pdb;pdb.set_trace()
    # paytm_params['CHECKSUMHASH'] = str(checksum)
    # print('SENT:', str(checksum.strip()))
    # print(verify_checksum(
    #     paytm_params, merchant_key,
    #     checksum))
    # print(verifySignature(x, merchant_key, checksum))
    print(dict(l))
    return Response({
        "params":dict(l)
    })
    # return render(request, 'redirect.html', context=paytm_params)
'''

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
# @permission_classes([permissions.AllowAny])
def order(request):
    # import pdb;pdb.set_trace()
    # 1000 means 10rs
    import datetime
    # customer = Customer.objects.get(user=User.objects.get(username=request.user.username))

    customer = Customer.objects.get(user=User.objects.get(username="aviuser"))
    cart = Cart.objects.filter(customer=customer, status="U")
    total_amount = Cart.objects.get_total_amount(cart[0])
    total_quantity = Cart.objects.get_total_quantity(cart[0])
    s_addr = ShippingAddress.objects.get(customer=customer, cart=cart[0])

    order_model = Order.objects.create(
        customer=customer,
        transaction_id="",
        order_amount=total_amount,
        shipping_address=s_addr,
        order_date=datetime.datetime.today().date(),
        quantity=total_quantity,
        cart=cart[0],
        order_time=datetime.datetime.today().time()
    )
    total_amount = total_amount*100
    response = razorpay_client.order.create(dict(amount=total_amount, currency="INR"))

    return Response(dict(response))

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
# @permission_classes([permissions.AllowAny])
def capture(request):
    customer = Customer.objects.get(user=User.objects.get(username="aviuser"))
    response = request.data
    params_dict = {
        'razorpay_payment_id': response['razorpay_payment_id'],
        'razorpay_order_id': response['razorpay_order_id'],
        'razorpay_signature': response['razorpay_signature']
    }
    # VERIFYING SIGNATURE
    try:
        status = razorpay_client.utility.verify_payment_signature(params_dict)
        order_model = Order.objects.get(payment_status="I",customer=customer)
        order_model.payment_status = "S"
        order_model.payment_signature = params_dict['razorpay_signature']
        order_model.payment_order_id = params_dict['razorpay_order_id']
        order_model.payment_id = params_dict['razorpay_payment_id']
        order_model.save()
        customer = Customer.objects.get(user=User.objects.get(username=request.user.username))
        cart = Cart.objects.get(customer=customer, status="U")
        cart.status = "P"
        for item in cart.cart_items.all():
            item.status = "P"
            item.save()
        cart.save()
        send_email_to_customer(request.user.email)
        send_email_to_courier("rahulroshan96@gmail.com", int(order_model.quantity))
        update_sheet(params_dict, request.user)
        # 1. Order model complete
        # 2. Cart status Paid
        # 3. Email Drop
        # 4. Excel Sheet Entry
        return Response(dict({"status":"success"}))
    except:
        order_model = Order.objects.get(payment_status="I", customer=customer)
        order_model.payment_status = "F"
        order_model.payment_signature = params_dict['razorpay_signature']
        order_model.payment_order_id = params_dict['razorpay_order_id']
        order_model.payment_id = params_dict['razorpay_payment_id']
        order_model.save()
        send_email_to_customer(request.user.email, "failed")
        return Response(dict({"status": "failed"}))

def update_sheet(params_dict, user):
    import datetime
    gc = gspread.authorize(credentials)
    wks = gc.open("Namkeen").sheet1
    wks.append_row([str(datetime.datetime.now().isoformat()), user.email, user.username, 0,
                    params_dict["razorpay_payment_id"],
                    params_dict["razorpay_order_id"],
                    params_dict["razorpay_signature"]])

def send_email_to_customer(to_email, status="success"):
    try:
        send_mail(
            'NamkeenBytes Order',
            "You have ordered from NamkeenBytes" if status=="success" else "Your order from NamkeenBytes failed",
            'namkeenbytes@gmail.com',
            [to_email, 'namkeenbytes@gmail.com'],
            fail_silently=False,
        )
    except:
        # add logging mechanism in case of fail
        pass

def send_email_to_courier(to_email, total_quantity):
    try:
        send_mail(
            'NamkeenBytes Order Pickup',
            "Inside Package: Namkeen,\nWeight: %s kg,\nPickupAddress: %s"%(str(total_quantity/2), PICKUP_ADDRESS),
            'namkeenbytes@gmail.com',
            [to_email, 'namkeenbytes@gmail.com'],
            fail_silently=False,
        )
    except:
        # add logging mechanism in case of fail
        pass




# this is to check token is correct or not
class Protected(APIView):
    def get(self, request):
        return Response(data={'type': 'protected'})


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def email(request):
    try:
        send_mail(
            'ContactUs: %s - %s'%(str(request.data.get("username","")), str(request.data.get("email",""))),
            str(request.data.get("message","")),
            'namkeenbytes@gmail.com',
            ['namkeenbytes@gmail.com'],
            fail_silently=False,
        )
    except:
        pass
    return Response({})

protected = Protected.as_view()


