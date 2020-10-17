from django.urls import path

from plann.api import UserTasks


urlpatterns = [
    path('tasks/', UserTasks.as_view({'get': 'list'}), name='api-task'),
]
