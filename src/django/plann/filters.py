from django_filters import rest_framework as filters

from plann.models import Task


class ListFilter(filters.Filter):

    def filter(self, queryset, value):
        if not value:
            return queryset

        return queryset.filter(**{
            self.field_name: self._get_value(),
        })

    def _get_value(self):
        return self.parent.request.query_params.get(self.field_name).split(',')


class IntListFilter(ListFilter):

    def _get_value(self):
        return list(map(int, super()._get_value()))


class SearchFilter(filters.Filter):

    def __init__(self, fields, *args, **kwargs):
        self._fields = fields
        super().__init__(*args, **kwargs)

    def filter(self, queryset, value):
        if not value:
            return queryset

        return queryset.filter(**{
            f'{field}__startswith': value
            for field in self._fields
        })


class TaskFilterSet(filters.FilterSet):
    priority__in = IntListFilter()
    status__in = IntListFilter()
    search = SearchFilter(('name',))

    class Meta:
        model = Task
        fields = ['priority', 'status', 'name']
