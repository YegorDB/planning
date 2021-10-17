from django.conf import settings
from django.db import models
from django.utils.translation import gettext as _


class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Task(models.Model):

    class Priority(models.IntegerChoices):
        NOT_SET = 0, _('Not setted')
        LOW = 1, _('Low')
        NORMAL = 2, _('Normal')
        HIGH = 3, _('High')
        CRITICAL = 4, _('Critical')

    class Status(models.IntegerChoices):
        CANCELED = 0, _('Canceled')
        DONE = 1, _('Done')
        NOT_STARTED = 2, _('Not started')
        IN_PROGRESS = 3, _('In progress')

    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, default='')

    creator = models.ForeignKey(settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='created_tasks'
    )
    responsible = models.ForeignKey(settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='tasks'
    )

    creation_datetime = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField(blank=True, null=True)
    duration = models.DurationField(blank=True, null=True)

    priority = models.SmallIntegerField(
        choices=Priority.choices,
        default=Priority.NOT_SET
    )
    status = models.SmallIntegerField(
        choices=Status.choices,
        default=Status.NOT_STARTED
    )

    depends_on = models.ManyToManyField(
        'self',
        symmetrical=False,
        related_name='depending',
        related_query_name='depending',
    )
    parent = models.ForeignKey('self',
        on_delete=models.CASCADE,
        related_name='children',
        blank=True,
        null=True
    )

    tags = models.ManyToManyField(Tag)
