from django.contrib import admin

from plann.models import Tag


class TagAdmin(admin.ModelAdmin):
    fields = ('name',)
    list_display = ('name',)
    search_fields = ('^name',)

    def has_view_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_add_permission(self, request):
        return request.user.is_superuser

    def has_change_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser


admin.site.register(Tag, TagAdmin)
