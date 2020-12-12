from django.contrib.auth import get_user_model

from rest_framework import serializers

from plann.models import Task


class TaskRelatedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'first_name', 'last_name']


class TaskSerializer(serializers.ModelSerializer):
    creator = TaskRelatedUserSerializer()
    responsible = TaskRelatedUserSerializer()

    class Meta:
        model = Task
        fields = '__all__'
        extra_kwargs = {'depends_on': {'required': False}}
