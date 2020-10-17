from django.conf import settings
from django.db import models
from django.utils.translation import gettext as _


class Task(models.Model):

    class Priority(models.IntegerChoices):
        NOT_SET = 0, _('Not set')
        LOW = 1, _('Low')
        NORMAL = 2, _('Normal')
        HIGH = 3, _('High')
        CRITICAL = 4, _('Critical')

    class Status(models.TextChoices):
        NOT_SET = 'NS', _('Not set')
        IN_PROGRESS = 'IP', _('In progress')
        DONE = 'DN', _('Done')
        CANCELED = 'CL', _('Canceled')

    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, default='')
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_tasks')
    responsible = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tasks')
    deadline = models.DateTimeField()
    duration = models.DurationField()
    priority = models.SmallIntegerField(choices=Priority.choices, default=Priority.NOT_SET)
    depends_on = models.ManyToManyField('self')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, related_name='children', blank=True, null=True)
    status = models.CharField(max_length=2, choices=Status.choices, default=Status.NOT_SET)
