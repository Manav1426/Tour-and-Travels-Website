from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser,Booking

class CustomUserAdmin(UserAdmin):
    model = CustomUser

    # Show these fields when editing an existing user
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('mobile', 'address', 'title')}),
    )

    # Show these fields when adding a new user
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('mobile', 'address', 'title')}),
    )

    # Optional: fields to display in user list
    list_display = ['username', 'email', 'title', 'mobile', 'is_staff']
    search_fields = ['username', 'email', 'mobile', 'title']

admin.site.register(CustomUser, CustomUserAdmin)

class BookingAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'destination', 'travel_date', 'travelers')
    search_fields = ('name', 'email', 'destination')
    list_filter = ('destination', 'travel_date')
admin.site.register(Booking)

