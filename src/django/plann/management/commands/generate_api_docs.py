from django.core.management.base import BaseCommand

from plann.docs import DocsCreator


class Command(BaseCommand):
    help = 'Create API documentation.'

    def handle(self, *args, **options):
        with open('/docs/api/README.md', 'w') as f:
            f.write(DocsCreator.api())
