from django.urls import path

from plann.views import TasksView


urlpatterns = [
    path('tasks/', TasksView.as_view(), name='tasks'),
]
