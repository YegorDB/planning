from rest_framework import generics

from plann.serializers import TaskSerializer, TaskListSerializer


class UserTasks(generics.ListAPIView):
    '''
    > User tasks list

    ### Method
    GET

    ### Response json data
    ```
    [
        {
            "id": integer,
            "creator": {
                "id": integer,
                "username": string,
                "first_name": string,
                "last_name": string,
            },
            "responsible": {
                "id": integer,
                "username": string,
                "first_name": string,
                "last_name": string,
            },
            "name": string,
            "description": string,
            "priority": integer,
            "status": string,
            "creation_datetime": ISO 8601 datetime string
        }
        ...
    ]
    ```

    ### Authorization header
    `Authorization: Token ${api_token_value}`
    '''

    serializer_class = TaskListSerializer

    def get_queryset(self):
        return self.request.user.tasks.order_by('-priority')


class CreateTask(generics.CreateAPIView):
    '''
    > Task creation

    ### Method
    POST

    ### Request json data
    ```
    {
        "name": string,
        "description": string (not required),
        "priority": integer (not required),
        "status": string (not required)
    }
    ```

    ### Response json data
    ```
    {
        "id": integer,
        "creator": integer,
        "responsible": integer,
        "name": string,
        "description": string,
        "priority": integer,
        "status": string,
        "creation_datetime": ISO 8601 datetime string
    }
    ```

    ### Authorization header
    `Authorization: Token ${api_token_value}`
    '''

    serializer_class = TaskSerializer

    def create(self, request, *args, **kwargs):
        request.data['creator'] = request.user.id
        request.data['responsible'] = request.user.id
        return super().create(request, *args, **kwargs)


class UpdateTask(generics.UpdateAPIView):
    '''
    > User task updation

    ### Method
    PATCH

    ### Request json data
    ```
    {
        "name": string (not required),
        "description": string (not required),
        "priority": integer (not required),
        "status": string (not required)
    }
    ```

    ### Response json data
    ```
    {
        "id": integer,
        "creator": integer,
        "responsible": integer,
        "name": string,
        "description": string,
        "priority": integer,
        "status": string,
        "creation_datetime": ISO 8601 datetime string
    }
    ```

    ### Authorization header
    `Authorization: Token ${api_token_value}`
    '''

    serializer_class = TaskSerializer

    def get_queryset(self):
        return self.request.user.tasks
