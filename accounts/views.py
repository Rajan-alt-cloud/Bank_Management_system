from rest_framework_simplejwt.tokens import RefreshToken
from django.db import transaction
from transactions.models import Transaction
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import BankAccount
from django.contrib.auth import authenticate
from decimal import Decimal
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

@api_view(['POST'])
def register(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not email or not password:
        return Response({
            "message": "All fields are required"
        }, status=400)

    if User.objects.filter(username=username).exists():
        return Response({
            "message": "Username already exists"
        }, status=400)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    BankAccount.objects.create(
        user=user,
        account_number=str(100000000000 + user.id)
    )

    return Response({
        "message": "User Registered Successfully"
    })


@api_view(['POST'])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user:
        return Response({
            "message": "Login Successful"
        })

    return Response({
        "message": "Invalid Username or Password"
    }, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def account_details(request):
    user = request.user
    account = BankAccount.objects.get(user=user)

    return Response({
        "username": user.username,
        "email": user.email,
        "account_number": account.account_number,
        "balance": account.balance
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deposit(request):
    user = request.user

    try:
        amount = Decimal(request.data.get("amount"))
    except:
        return Response({
            "message": "Please enter a valid amount"
        }, status=400)

    if amount <= 0:
        return Response({
            "message": "Amount must be greater than 0"
        }, status=400)

    account = BankAccount.objects.get(user=user)

    account.balance += amount
    account.save()

    Transaction.objects.create(
        user=user,
        transaction_type="DEPOSIT",
        amount=amount,
        account_number=account.account_number
    )

    return Response({
        "message": "Money Deposited Successfully",
        "balance": account.balance
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def withdraw(request):
    user = request.user

    try:
        amount = Decimal(request.data.get("amount"))
    except:
        return Response({
            "message": "Please enter a valid amount"
        }, status=400)

    if amount <= 0:
        return Response({
            "message": "Amount must be greater than 0"
        }, status=400)

    account = BankAccount.objects.get(user=user)

    if account.balance < amount:
        return Response({
            "message": "Insufficient Balance"
        }, status=400)

    account.balance -= amount
    account.save()

    Transaction.objects.create(
        user=user,
        transaction_type="WITHDRAW",
        amount=amount
    )

    return Response({
        "message": "Money Withdraw Successfully",
        "balance": account.balance
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def transfer(request):
    sender = request.user

    receiver_account_number = request.data.get("account_number")

    try:
        amount = Decimal(request.data.get("amount"))
    except:
        return Response({
            "message": "Please enter a valid amount"
        }, status=400)

    if amount <= 0:
        return Response({
            "message": "Amount must be greater than 0"
        }, status=400)

    try:
        sender_account = BankAccount.objects.get(user=sender)

        receiver_account = BankAccount.objects.get(
            account_number=receiver_account_number
        )

    except BankAccount.DoesNotExist:
        return Response({
            "message": "Receiver account not found"
        }, status=404)

    if sender_account.account_number == receiver_account.account_number:
        return Response({
            "message": "You cannot transfer money to your own account"
        }, status=400)

    if sender_account.balance < amount:
        return Response({
            "message": "Insufficient Balance"
        }, status=400)

    with transaction.atomic():

        sender_account.balance -= amount
        receiver_account.balance += amount

        sender_account.save()
        receiver_account.save()

        # Sender Transaction
        Transaction.objects.create(
            user=sender,
            transaction_type="TRANSFER SENT",
            amount=amount,
            account_number=receiver_account.account_number
        )

        # Receiver Transaction
        Transaction.objects.create(
            user=receiver_account.user,
            transaction_type="TRANSFER RECEIVED",
            amount=amount,
            account_number=sender_account.account_number
        )

    return Response({
        "message": "Money Transfer Successful",
        "sender_balance": sender_account.balance
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def history(request):
    user = request.user

    transactions = Transaction.objects.filter(user=user)

    data = []

    for t in transactions:
        data.append({
            "type": t.transaction_type,
            "amount": str(t.amount),
            "account_number": t.account_number,
            "date": t.created_at
        })

    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data.get("refresh")

        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response({
            "message": "Logout Successful"
        })

    except Exception:
        return Response({
            "message": "Invalid Refresh Token"
        }, status=400)
