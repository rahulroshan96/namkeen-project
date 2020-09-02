from django.db import models

class CartItemManager(models.Manager):
    def get_unpaid_items(self):
        return self.filter(status="U")