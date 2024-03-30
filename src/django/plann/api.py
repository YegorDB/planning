from rest_framework import filters, generics

from plann.filters import TagFilterSet, TaskFilterSet
from plann.models import Tag
from plann.pagination import UserTasksPagination
from plann.serializers import TagSerializer, TaskSerializer, TaskListSerializer


class Tags(generics.ListAPIView):
    '''
    > Tags list

    ### Method
    GET

    ### Response json data
    ```
    [
        {
            "id": integer,
            "name": string
        }
        ...
    ]
    ```

    ### Authorization header
    `Authorization: Token ${api_token_value}`
    '''

    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filterset_class = TagFilterSet


class UserTasks(generics.ListAPIView):
    '''
    > User tasks list

    ### Method
    GET

    ### Response json data
    ```
    {
        "count": integer,
        "results": [
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
                "creation_datetime": ISO 8601 datetime string,
                "tags": [
                    {
                        "id": integer,
                        "name": string
                    },
                    ...
                ]
            }
            ...
        ]
    }
    ```

    ### Authorization header
    `Authorization: Token ${api_token_value}`
    '''

    serializer_class = TaskListSerializer
    filterset_class = TaskFilterSet
    pagination_class = UserTasksPagination

    def get_queryset(self):
        return self.request.user.tasks.order_by('-priority', '-status', 'id')


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
        "status": string (not required),
        "tags": [
            integer
            ...
        ] (not required)
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
        "status": string (not required),
        "tags": [
            integer
            ...
        ] (not required)
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
