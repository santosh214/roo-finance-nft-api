const { MongoClient, ObjectId } = require('mongodb');
const connectionString =
  'mongodb+srv://testt:test@cluster0.ynx72dz.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(connectionString);
