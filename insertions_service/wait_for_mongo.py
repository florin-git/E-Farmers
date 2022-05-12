from pymongo import MongoClient, errors
import time
import sys

host = sys.argv[1]
port = sys.argv[2]
db = host + ":" + port
mongo_online = False

while not mongo_online:
    try:
        client = MongoClient(host = [db], serverSelectionTimeoutMS = 2000)
        client.server_info()
        mongo_online = True
    except:
        print("The mongo database is offline, waiting...")
        time.sleep(2)
