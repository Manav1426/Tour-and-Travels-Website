from django.urls import path
from . import views
urlpatterns = [
    path('signup/', views.signup, name='signup'),      # This handles /auth/
    path('login/', views.login, name='login'),
    path('bookpackage/', views.book_package, name='bookpackage'),
    path('my-bookings/', views.my_bookings, name='my-bookings'),
    path('submit-review/', views.submit_review, name='submit-review'),
    path('reviews/', views.get_reviews, name='review'),
]
   