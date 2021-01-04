from django.views.generic import TemplateView

from plann.serializers import TaskCreationFormSerializer


class TasksView(TemplateView):
    template_name = "plann/tasks.html"

    def get_context_data(self, *args, **kwargs):
        return {
            **super().get_context_data(*args, **kwargs),
            'create_task_serializer': TaskCreationFormSerializer(),
        }