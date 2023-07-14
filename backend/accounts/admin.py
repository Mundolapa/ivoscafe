from django.contrib import admin
from .models import Profile, Address

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['full_address', 'user']
    list_filter = ['user', 'country', 'state_province']

    def full_address(self, obj):
        return str(obj)

    full_address.short_description = 'Full Address'

admin.site.register(Profile)