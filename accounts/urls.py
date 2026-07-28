from django.urls import path
from .views import register,login,account_details,deposit,withdraw,history,transfer,logout


urlpatterns = [
    path("register/", register),
    path("login/", login),
    path("account/", account_details),
    path("deposit/", deposit),
    path("withdraw/", withdraw),
    path("history/", history),
    path("transfer/",transfer),
    path("logout/", logout),
]
