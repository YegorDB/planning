from rest_framework import viewsets

from plann.serializers import TaskSerializer


class UserTasks(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        return self.request.user.tasks.all()
