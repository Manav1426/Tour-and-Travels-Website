# mongo.py
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["tours_and_travels"]
users_collection = db["users"]
bookings_collection=db["bookings"]
review_collection=db["reviews"]
