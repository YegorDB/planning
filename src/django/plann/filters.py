from django_filters import rest_framework as filters

from plann.models import Task


class ListFilter(filters.Filter):

    def filter(self, queryset, value):
        return queryset.filter(**{
            self.field_name: self._get_value(),
        })

    def _get_value(self):
        return self.parent.request.query_params.getlist(f'{self.field_name}[]')


class IntListFilter(ListFilter):

    def _get_value(self):
        return list(map(int, super()._get_value()))


class TaskFilterSet(filters.FilterSet):
    priority__in = IntListFilter()
    status__in = IntListFilter()

    class Meta:
        model = Task
        fields = ['priority', 'status__in']
