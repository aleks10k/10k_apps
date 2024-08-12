
from django.urls import path

from home import views

app_name = 'home'


urlpatterns = [

    path('', views.HomePage.as_view(), name='home'),

    path('answer/', views.AnswerRedirect.as_view(), name='answer')
]
