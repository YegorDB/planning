from django.contrib.auth import get_user_model

from rest_framework import serializers

from plann.models import Task


class TaskCreationFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['name', 'description', 'priority']
        extra_kwargs = {
            'name': {
                'style': {'template': 'plann/task_creation/name_input.html'},
            },
            'description': {
                'style': {'template': 'plann/task_creation/description_textarea.html'},
            },
            'priority': {
                'style': {'template': 'plann/task_creation/priority_select.html'},
            },
        }


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        extra_kwargs = {'depends_on': {'required': False}}


class TaskRelatedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'first_name', 'last_name']


class TaskListSerializer(serializers.ModelSerializer):
    creator = TaskRelatedUserSerializer()
    responsible = TaskRelatedUserSerializer()

    class Meta:
        model = Task
        fields = '__all__'
