const db = require('../db/dbInstance')

async function login_email(data) {
  const instance = await db('user')
  const collection = instance.collection
  const result = await collection.find({email: data.email}).toArray()
  return result
}

async function login_phone(data) {
  const instance = await db('user')
  const collection = instance.collection
  const result = await collection.find(data).toArray()
  return result
}

async function login_out() {

}

async function info(phoneNumber) {
  const instance = await db('user')
  const collection = instance.collection
  const result = await collection.find({phoneNumber}).toArray()
  return result
}

async function register_phone(phoneNumber, data) {
  const instance = await db('user')
  const collection = instance.collection
  let result = null
  if (phoneNumber) {
    result = await collection.updateOne({phoneNumber}, {$set: data})
  } else {
    result = await collection.insertMany([data])
    collection.createIndex({ id: 1 })
  }
  return result
}

async function register_email(phoneNumber, data) {
  const instance = await db('user')
  const collection = instance.collection
  const result = await collection.updateOne({phoneNumber}, {$set: data})
  return result
}

async function register_setInfo(phoneNumber, data) {
  const instance = await db('user')
  const collection = instance.collection
  const result = await collection.updateOne({phoneNumber}, {$set: data})
  return result
}

module.exports = {
  login_email,
  login_phone,
  login_out,
  info,
  register_phone,
  register_email,
  register_setInfo
}
