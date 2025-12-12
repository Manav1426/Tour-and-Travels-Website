from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth import get_user_model

# User = get_user_model()

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=15, blank=True)
    country = models.CharField(max_length=50, blank=True)
    city = models.CharField(max_length=50, blank=True)
    title = models.CharField(max_length=100, blank=True)  # Optional: e.g., Mr., Ms., Dr., etc.
    is_customer = models.BooleanField(default=True)  # Optional role-based usage

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # 'username' is still needed if you extend AbstractUser

    def __str__(self):
        return self.username

class Booking(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    email = models.EmailField()
    mobile = models.CharField(max_length=15)
    destination = models.CharField(max_length=100)
    package = models.CharField(max_length=100)
    travel_date = models.DateField()
    travelers = models.IntegerField()

    def __str__(self):
        return f"{self.user.username} - {self.destination}"
    
class TravelerDetail(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='traveler_details')
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.name} ({self.age}, {self.gender})"

class Review(models.Model):
    destination = models.CharField(max_length=100)
    # package_name = models.CharField(max_length=100)
    description = models.TextField()
    rating = models.IntegerField()
    email = models.EmailField()  # Optional: to identify user (if using login)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
            return f"{self.destination}"