var express = require('express');
const dotenv= require('dotenv')
dotenv.config()
const { MongoClient, ObjectId } = require('mongodb');
var router = express.Router();

const connectionString = process.env.DATABASE_URL
console.log("🚀 ~ connectionString", connectionString)
const client = new MongoClient(connectionString);
router.get('/', async (req, res) => {
  let db = client.db('nft');
  let collection = db.collection('nftCollection');
  let results = await collection.find({}).limit(50).toArray();
  res.send(results).status(200);
});

router.get('/filter/:creator_address/:collection_address', async (req, res) => {
  let db = client.db('nft');

  let collection = db.collection('nftCollection');

  let results = await collection
    .find({
      creator_address: req.params?.creator_address,
      collection_address: req?.params?.collection_address,
    })
    .limit(50)
    .toArray();

  res.send(results).status(200);
});

// console.log("🚀 ~ client", client)
router.post('/', async (req, res) => {
  console.log('in post');
  let conn;
  try {
    conn = await client.connect();
    console.log('🚀 ~ router.post ~ conn', conn);
  } catch (e) {
    console.log('🚀 ~ e', e);
    console.error(e);
  }

  let db = conn.db('nft');
  console.log('🚀 ~ router.post ~ db', db);
  console.log('🚀 ~ router.post ~ req', req.body);
  let collection = db.collection('nftCollection');
  console.log('🚀 ~ router.post ~ collection', collection);
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  console.log('🚀 ~ router.post ~ result', result);
  res.send(result).status(204);
});

router.put('/', async (req, res) => {
  console.log('in post');
  let conn;
  try {
    conn = await client.connect();
    console.log('🚀 ~ router.post ~ conn', conn);
  } catch (e) {
    console.log('🚀 ~ e', e);
    console.error(e);
  }

  let db = conn.db('nft');
  console.log('🚀 ~ router.post ~ db', db);
  console.log('🚀 ~ router.post ~ req', req.body);
  let collection = db.collection('nftCollection');
  let update = await collection.updateOne(
    { _id: new ObjectId(req.body?._id) },
    { $set: { expire_date: req.body?.expire_date } }
  );
  console.log('🚀 ~ router.put ~ update', update);
  res.send(update).status(200);
});

module.exports = router;
