from django.db import models
from django.contrib.auth.models import User
from .managers import CartItemManager
# Create your models here.


PAYMENT_STATUS = (
        ('P', 'Paid'),
        ('U', 'Unpaid'),
    )

PAYMENT_CHOICES = (
        ('S', 'Success'),
        ('F', 'Failed'),
    )

class Customer(models.Model):

    user    = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    address = models.TextField(max_length=1000, null=True, blank=True)
    city    = models.CharField(max_length=20, null=True , blank=True)
    state   = models.CharField(max_length=20, null=True, blank=True)
    pincode = models.IntegerField(null=True, blank=True)
    #image

    def __str__(self):
        return self.user.username

# default='path/to/my/default/image.jpg'
class Product(models.Model):

    product_name        = models.CharField(max_length=20)
    product_weight_gm   = models.IntegerField()
    product_desc        = models.CharField(max_length=500)
    product_price       = models.IntegerField()
    image = models.ImageField(upload_to='images/', default="")

    def __str__(self):
        return self.product_name

'''
1 Create a new Cart at the time of Checkout button click
'''
'''
card = {
cartItemsList: [
    {
        "product id":"1",
        "quantity:"4"
    },
    {
        "product id":"2",
        "quantity:"2"
    }
    ]
}

'''

'''
1. List all CartItems with unpaid status and current user // Clicking on checkout list all the cart items
2. Create CartItem // On Clicking on checkout button, collect all items with quantity and create all CartItems
3. Delete CartItem // at checkout stage if customer wants to delete some of the cart item
4. Update the CartItem // at checkout stage if customer wants to increase or decrease the quantity of Product
'''

class CartItem(models.Model):
    cart_item_customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    status = models.CharField(max_length=1, choices=PAYMENT_STATUS, blank=True, null=True, default='U')

    def __str__(self):
        return "item-%s-%s" % (self.product.product_name, str(self.id))

class Cart(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, blank=True)
    status = models.CharField(max_length=1, choices=PAYMENT_STATUS, default="U")
    cart_items = models.ManyToManyField(CartItem, blank=True, null=True)

    def __str__(self):
        return "cart-%s" % self.customer.user.username

class ShippingAddress(models.Model):
    customer    = models.ForeignKey(Customer, on_delete=models.CASCADE, blank=True, null=True)
    cart        = models.ForeignKey(Cart, on_delete=models.CASCADE, blank=True, null=True)
    address     = models.CharField(max_length=1000, null=True, blank=True)
    city        = models.CharField(max_length=1000, null=True, blank=True)
    state       = models.CharField(max_length=1000, null=True, blank=True)
    pincode     = models.IntegerField(null=True, blank=True)
    mobile_no   = models.CharField(max_length=14, null=True, blank=True)

    def __str__(self):
        return "shipping-addr-%s"%self.customer.user.username

class Order(models.Model):
    customer    = models.ForeignKey(Customer, on_delete=models.CASCADE, blank=True, null=False, default="")
    transaction_id      = models.CharField(max_length=1000, blank=True, null=False, default="")
    payment_status      = models.CharField(max_length=1, choices=PAYMENT_CHOICES, blank=True, null=True)
    order_amount        = models.FloatField(blank=True, null=True)
    shipping_address    =  models.ForeignKey(ShippingAddress, on_delete=models.CASCADE, blank=True, null=True)
    order_date          = models.DateField(blank=True, null=True)
    # update the products from products list
    cart_items          = models.ManyToManyField(CartItem, blank=True, null=True)
    quantity            = models.IntegerField(blank=True, null=True)
    cart                = models.ForeignKey(Cart, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return "order-%s-%s"%(self.customer.user.username, str(self.transaction_id))

'''
1. List all CartItems with unpaid status and current user // Clicking on checkout list all the cart items
2. Create CartItem // On Clicking on checkout button, collect all items with quantity and create all CartItems
3. Delete CartItem // at checkout stage if customer wants to delete some of the cart item
4. Update the CartItem // at checkout stage if customer wants to increase or decrease the quantity of Product
'''


