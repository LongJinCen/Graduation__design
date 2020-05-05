const MongoClient = require('mongodb').MongoClient
const config = require('../config/db')

const client = new MongoClient(config.MONGODB_CONFIG.url)

async function db(collection) {
  await client.connect()
  console.log('mongodb connect success')
  const db = client.db(config.MONGODB_CONFIG.dbName)
  return {
    collection: db.collection(collection),
    client
  }
}

module.exports = db
