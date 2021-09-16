import json

from django.contrib.auth.mixins import AccessMixin, LoginRequiredMixin
from django.db.models import Q
from django.urls import reverse
from django.views.generic import TemplateView

from plann.models import Tag, Task
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
            'tags': json.dumps(list(Tag.objects.values('id', 'name'))),
        }


class TaskView(AccessMixin, TemplateView):
    login_url = '/admin/login/'
    template_name = "plann/task.html"

    def dispatch(self, request, id):
        if (not request.user.is_authenticated
            or not self._has_permission(request.user, id)):
            return self.handle_no_permission()
        return super().dispatch(request, id=id)

    def _has_permission(self, user, id):
        return (
            Task.objects
            .filter(
                Q(creator=user) | Q(responsible=user),
                id=id,
            )
            .exists()
        )
