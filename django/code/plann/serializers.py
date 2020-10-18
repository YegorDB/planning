from rest_framework import serializers

from plann.models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        extra_kwargs = {'depends_on': {'required': False}}
