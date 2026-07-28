from django.contrib import admin
from .models import BankAccount


@admin.register(BankAccount)
class BankAccountAdmin(admin.ModelAdmin):
    list_display = ('user', 'account_number', 'balance', 'created_at')
    search_fields = ('user__username', 'account_number')
    list_filter = ('created_at',)
