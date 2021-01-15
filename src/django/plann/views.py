import json

from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.views.generic import TemplateView

from plann.models import Task
from plann.serializers import TaskCreationFormSerializer


class TasksView(LoginRequiredMixin, TemplateView):
    login_url = '/admin/login/'
    template_name = "plann/tasks.html"

    def get_context_data(self, *args, **kwargs):
        return {
            **super().get_context_data(*args, **kwargs),
            'choices': json.dumps({
                'task': {
                    'priority': dict(Task.Priority.choices),
                    'status': dict(Task.Status.choices),
                },
            }),
            'create_task_serializer': TaskCreationFormSerializer(),
            'urls': json.dumps({
                'create_task': reverse('api:create-task'),
                'update_task': reverse('api:update-task', kwargs={'pk': 1}),
                'user_tasks': reverse('api:user-tasks'),
            }),
        }
