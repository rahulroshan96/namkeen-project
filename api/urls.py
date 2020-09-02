"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from .views import apiOverview, cart_item_list, \
    cart_item_paid_list, cart_item_unpaid_list, cart_create, \
    products_list, cart_get, register, ship_addr_get, ship_addr_create, protected
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    url(r'^protected/', protected, name='protected'),
    url(r'^token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url(r'^token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    url(r'^token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    url(r'^cart-item-all-list$', cart_item_list, name='cart-item-all-list'),
    url(r'^cart-item-unpaid-list$', cart_item_unpaid_list, name='cart-item-unpaid-list'),
    url(r'^cart-item-paid-list$', cart_item_paid_list, name='cart-item-paid-list'),
    url(r'^cart-create/', cart_create, name='cart-create'),
    url(r'^cart-get/', cart_get, name='cart-get'),
    url(r'^products-list/', products_list, name='products-list'),
    url(r'^register/', register, name='register'),
    url(r'^shipping-address-get/', ship_addr_get, name='shipping-address'),
    url(r'^shipping-address-create/', ship_addr_create, name='ship-addr-create'),
    url(r'^', apiOverview, name='api-overview'),
]
