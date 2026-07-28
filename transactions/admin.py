from django.contrib import admin
from .models import Transaction


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'transaction_type', 'amount', 'created_at')
    search_fields = ('user__username', 'transaction_type')
    list_filter = ('transaction_type', 'created_at')
