from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .mongo import users_collection, bookings_collection, review_collection # renamed file from firebase.py to mongo.py
from django.contrib.auth.decorators import login_required
from .models import Booking
from django.utils.decorators import method_decorator
import re
from pprint import pprint

@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            if not email or not password:
                return JsonResponse({"error": "Email and Password required"}, status=400)

            # Check if user exists
            user = users_collection.find_one({"email": email})

            if user:
                if user.get("password") == password:
                    return JsonResponse({"message": "User exists, login successful"}, status=200)
                else:
                    return JsonResponse({"error": "Wrong password"}, status=401)
            else:
                # Auto-register new user
                users_collection.insert_one({
                    "email": email,
                    "password": password
                })
                return JsonResponse({"message": "User not found. Registered successfully!"}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST allowed"}, status=405)

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # print("Received data:", data)
            email = data.get("email")
            first_name = data.get("firstName")
            last_name = data.get("lastName")
            title = data.get("title")
            password = data.get("password")
            mobile = data.get("number")
            country = data.get("country")
            city = data.get("city")

            full_name = f"{title} {first_name} {last_name}"

            if users_collection.find_one({"email": email}):
                return JsonResponse({"error": "User already exists"}, status=400)

            users_collection.insert_one({
                "email": email,
                "username": full_name,
                "password": password,
                "mobile": mobile,
                "country": country,
                "city": city
            })

            return JsonResponse({"success": True, "message": "User registered successfully!"}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST allowed"}, status=405)




@csrf_exempt
# @login_required(login_url='/login/')
def book_package(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            booking_data = {
                "user_id": str(request.user.id),  # assuming user is from Django auth
                "name": data.get("name"),
                "email": data.get("email"),
                "mobile": data.get("mobile"),
                "destination": data.get("destination"),
                "package": data.get("package"),
                "travel_date": data.get("travelDate"),
                "travelers": data.get("travelers"),
                "traveler_details": data.get("travelerDetails"),
            }
            bookings_collection.insert_one(booking_data)

            return JsonResponse({"message": "Booking successful"}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid method"}, status=405)


@csrf_exempt
def my_bookings(request):
    
    user_email = request.GET.get("email")
    # print("User email from query:", user_email)
    # print(user_email)
    if not user_email:
        return JsonResponse({"message": "Email is required"}, status=400)
    # print(bookings_collection)

    booking_cursor = list(bookings_collection.find({"email": user_email}))

    # print(booking_cursor)

    bookings = []

    for booking in booking_cursor:
        print(booking)
        bookings.append({
            "destination": booking.get("destination"),
            "package": booking.get("package"),
            "travel_date": booking.get("travel_date"),
            "travelers": booking.get("travelers"),
            "traveler_details": booking.get("traveler_details"),

        })

    # pprint("Bookings fetched:", bookings)

    if not bookings:
        return JsonResponse({"message": "No bookings found"}, status=404)

    return JsonResponse({"bookings": bookings}, status=200)

@csrf_exempt
def submit_review(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            review = {
            "destination" : data.get('destination'),
            # "package_name" : data.get('packageName'),
            "description" : data.get('description'),
            "rating" : data.get('rating'),
            "email" : data.get('email', ''), } # Optional: include if needed

            # except Exception :
            #     return JsonResponse({'error': 'All fields are required'}, status=400)

            review_collection.insert_one(review)
            return JsonResponse({'success': True, 'message': 'Review submitted successfully'})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request'}, status=405)

@csrf_exempt
def get_reviews(request):
    destination = request.GET.get('destination')
    if not destination:
        return JsonResponse({'error': 'Destination is required'}, status=400)

    try:
        # Use review_collection directly from mongo.py
        reviews = list(review_collection.find({"destination": destination}, {'_id': 0}))

        return JsonResponse(reviews, safe=False)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)