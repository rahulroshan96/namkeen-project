from rest_framework import serializers
from .models import CartItem, Cart, Product, Customer, ShippingAddress
from django.contrib.auth.models import User


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'id', 'email']
        extra_kwargs = {'password': {'write_only': True, 'required':True},
                        'username': {'required': True},
                        'email': {'required': True}
                        }

    # def validate(self, data):
    #     for f in self.fields:
    #         if f!="id" and not data[f]:
    #             raise serializers.ValidationError("Field %s is Required", f)

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        customer = Customer(user=user)
        customer.save()
        return user


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ('quantity', 'product',)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        depth=2


class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True)

    class Meta:
        model = CartItem
        fields = ('cart_items',)
        depth = 10

    def create(self, validated_data):
        _item_carts = validated_data.pop('cart_items',[])
        # customer = Customer.objects.filter(user=User.objects.get(username=self.context['request'].user.username))[0]
        customer = Customer.objects.filter(user=User.objects.get(username="aviuser"))[0]
        cart = Cart.objects.create(customer=customer)
        for item in _item_carts:
            i = CartItem.objects.create(product=item['product'], quantity=item['quantity'],
                                            cart_item_customer=customer)
            cart.cart_items.add(i)
        return cart

    def if_old_item_present_in_new(self, old_item, new_item_list):
        for nitem in new_item_list:
            if old_item.product == nitem['product']:
                return True
        return False

    def update(self, instance, validated_data):
        _item_carts = validated_data.pop('cart_items',[])
        for item in _item_carts:
            i = CartItem.objects.filter(product=item['product'])
            if i:
                i[0].quantity = item['quantity']
                i[0].save()
            else:
                # customer = Customer.objects.filter(user=User.objects.get(username=self.context['request'].user.username))[0]
                customer = Customer.objects.filter(user=User.objects.get(username="aviuser"))[0]
                new_item = CartItem.objects.create(product=item['product'], quantity=item['quantity'],
                                                       cart_item_customer=customer)
                instance.cart_items.add(new_item)
        # check for any deleted item

        stale_items_list = []
        for item in instance.cart_items.all():
            if not self.if_old_item_present_in_new(item, _item_carts):
                # check for customer after authentication
                old_item = CartItem.objects.filter(product=item.product, status="U")
                old_item.delete()
                stale_items_list.append(item)

        for item in stale_items_list:
            instance.cart_items.remove(item)
        return instance


# TODO: handle lowercase and uppercase username and fieldnames
class ShippingAddressSerializer(serializers.ModelSerializer):

    address = serializers.CharField(required=True)
    city = serializers.CharField(required=True)
    state = serializers.CharField(required=True)
    mobile_no = serializers.CharField(required=True)
    pincode = serializers.IntegerField(required=True)

    class Meta:
        model = ShippingAddress
        fields = ('address', 'city', 'state', 'pincode', "mobile_no", )

    def create(self, validated_data):
        ship_addr = None
        # import pdb;pdb.set_trace()
        # username = self.context['request'].user.username
        username = "aviuser"
        customer = Customer.objects.filter(user=User.objects.get(username=username))[0]
        cart = Cart.objects.filter(customer=customer, status="U")
        if cart:
            ship_addr = ShippingAddress.objects.create(customer=customer,
                                                       address=validated_data['address'],
                                                       state=validated_data['state'],
                                                       city=validated_data['city'],
                                                       mobile_no=validated_data['mobile_no'],
                                                       pincode=validated_data['pincode'],
                                                       cart=cart[0])
        else:
            ship_addr = ShippingAddress.objects.create(customer=customer,
                                                       address=validated_data['address'],
                                                       state=validated_data['state'],
                                                       mobile_no=validated_data['mobile_no'],
                                                       city=validated_data['city'],
                                                       pincode=validated_data['pincode'])
        return ship_addr

    def update(self, instance, validated_data):
        instance.address = validated_data.get('address', "")
        instance.state= validated_data.get('state', "")
        instance.city = validated_data.get('city', "")
        instance.mobile_no = validated_data.get('mobile_no', "")
        instance.pincode = validated_data.get('pincode', "")
        instance.save()
        return instance





