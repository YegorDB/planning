from rest_framework import generics

from plann.serializers import TaskCreateSerializer, TaskListSerializer


class UserTasks(generics.ListAPIView):
    '''
    ## Represent tasks of particular user
    '''

    serializer_class = TaskListSerializer

    def get_queryset(self):
        return self.request.user.tasks.all()


class CreateTask(generics.CreateAPIView):
    '''
    ## Task creation

    ### JSON data
    ```
    {
        "name": string (required),
        "description": string,
        "deadline": ISO 8601 datetime string (required),
        "duration": ISO 8601 duration string (required),
        "priority": integer,
        "depends_on": [
            integer,
            ...
        ],
        "parent": integer,
        "status": string
    }
    ```
    '''

    serializer_class = TaskCreateSerializer

    def create(self, request, *args, **kwargs):
        request.data['creator'] = request.user.id
        request.data['responsible'] = request.user.id
        return super().create(request, *args, **kwargs)
