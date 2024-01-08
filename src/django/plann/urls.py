from django.urls import path
from django.views.generic.base import RedirectView

from plann.views import TaskView, TasksView


urlpatterns = [
    path('task/<int:id>/', TaskView.as_view(), name='task'),
    path('tasks/', TasksView.as_view(), name='tasks'),
    path('', RedirectView.as_view(url='tasks/'), name='root'),
]
