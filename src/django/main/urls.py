from django.conf import settings
from django.contrib import admin
from django.urls import include, path

from plann.api import CreateTask, UpdateTask, UserTasks


api_urlpatterns = ([
    path('1.0/create_task/', CreateTask.as_view(), name='create-task'),
    path('1.0/update_task/<int:pk>/', UpdateTask.as_view(), name='update-task'),
    path('1.0/user_tasks/', UserTasks.as_view(), name='user-tasks'),
], 'api')


urlpatterns = [
    path('', include('plann.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(api_urlpatterns)),
]
