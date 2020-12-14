import json

from plann.models import Task


def choices(request):
    return {
        'choices': json.dumps({
            'task': {
                'priority': dict(Task.Priority.choices),
                'status': dict(Task.Status.choices),
            },
        }),
    }
