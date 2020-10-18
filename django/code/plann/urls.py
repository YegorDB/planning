from django.urls import path

from plann.api import CreateTask, UserTasks


urlpatterns = [
    path('tasks/', UserTasks.as_view(), name='api-task'),
    path('create_task/', CreateTask.as_view(), name='api-create-task'),
]
