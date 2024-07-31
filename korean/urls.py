

from django.urls import path

from korean import views

app_name = 'korean'


urlpatterns = [

    path('', views.MainPage.as_view(), name='main'),
    path('batchims/', views.BatchimsPage.as_view(), name='batchims'),

    path('difficulty/easy/', views.EasyView.as_view(), name='easy'),
    path('difficulty/medium/', views.MediumView.as_view(), name='medium'),
    path('difficulty/hard/', views.HardView.as_view(), name='hard'),
    path('difficulty/batchims/', views.BatchimsView.as_view(), name=''),
]
