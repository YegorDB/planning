from django.contrib.auth import get_user_model

from rest_framework import serializers

from plann.models import Tag, Task


class TaskCreationFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['name', 'description', 'priority', 'tags']
        extra_kwargs = {
            'name': {
                'style': {'template': 'plann/task_creation/name.html'},
            },
            'description': {
                'style': {'template': 'plann/task_creation/description.html'},
            },
            'priority': {
                'style': {'template': 'plann/task_creation/priority.html'},
            },
            'tags': {
                'style': {'template': 'plann/task_creation/tags.html'},
            },
        }


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


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
    tags = TagSerializer(many=True)
    creator = TaskRelatedUserSerializer()
    responsible = TaskRelatedUserSerializer()

    class Meta:
        model = Task
        fields = '__all__'
