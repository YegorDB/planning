from django.urls import path

from plann.views import TaskView, TasksView


urlpatterns = [
    path('task/<int:id>/', TaskView.as_view(), name='task'),
    path('tasks/', TasksView.as_view(), name='tasks'),
]
