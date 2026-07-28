from django.db import models
from django.contrib.auth.models import User


class Transaction(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    transaction_type = models.CharField(
        max_length=20
    )

    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    account_number = models.CharField(
        max_length=12,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.user.username} - {self.transaction_type}"
