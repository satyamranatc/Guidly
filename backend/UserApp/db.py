from pymongo import MongoClient

client = MongoClient("mongodb+srv://satyamrana665_db_user:HeVCxDyrEPBFvLOK@cluster0.pvw2twj.mongodb.net/")

db = client["testdb"]

users_collection = db["Users"]