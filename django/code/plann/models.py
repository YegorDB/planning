from django.db import models
from django.utils.translation import gettext as _


class Project(models.Model):
    name = models.CharField(max_length=100)


class Task(models.Model):

    class Priority(models.IntegerChoices):
        NOT_SET = 0, _('Not set')
        LOW = 1, _('Low')
        NORMAL = 2, _('Normal')
        HIGH = 3, _('High')
        CRITICAL = 4, _('Critical')

    name = models.CharField(max_length=100)
    deadline = models.DateTimeField()
    priority = models.SmallIntegerField(choices=Priority.choices, default=Priority.NOT_SET)
    depends_on = models.ManyToManyField('self')
    project = models.ForeignKey(Project, on_delete=models.CASCADE)


class Stage(models.Model):
    name = models.CharField(max_length=100)
    duration = models.DurationField()
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
