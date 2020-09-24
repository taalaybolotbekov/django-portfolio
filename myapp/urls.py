from django.urls import path
from .views import index
from .views import ApplicationsView


urlpatterns = [
    path('', index , name='home'),
    path('applications/', ApplicationsView.as_view(), name='applications'),
]