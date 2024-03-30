from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response


class UserTasksPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 10
    template = None

    def get_paginated_response(self, data):
        return Response({
            'count': self.count,
            'items': data
        })
