import pymongo
from pymongo import MongoClient
client = MongoClient("mongodb+srv://AlexanderTack:<password>@weerstation01-mh1ta.azure.mongodb.net/test?retryWrites=true")
print (client)
db = client.get_database('temperatuur01')
records = db.temp
records.count_documents()



waarde = {
 'id':'1',
 'temperature':'10',
 'humidity':'10'
}
print (k)

for l in range(4000):
    clients = db.clients.insert({"temperature":"21"});
print(l)

for f in range(2000):
    clients = db.clients.insert({"humidity":"55"});
print(f)

for i in range(100):
   clients = db.clients.insert({"date":"2019-05-16T14:40:56.000+00:00"});
print(i)


print (db.clients.find({"birthdate":{"$lt":"1990-01-01"}}).count())
print (db.clients.find({"birthdate":{"$gt":"1980-01-01"}}).count())

print(db.clients.count())
