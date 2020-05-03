const db = require('../db/dbInstance')

async function login_email(data) {
  const collection = await db('user')
  const result = await collection.find(data).toArray()
  return result
}

async function login_phone() {
  const collection = await db('user')
  const result = await collection.find(data).toArray()
  return result
}

async function login_out() {

}

async function info(accountName) {
  const collection = await db('user')
  const result = await collection.find({accountName}).toArray()
  return result
}

async function register_phone(data) {
  const collection = await db('user')
  const result = await collection.insertMany([data])
  return result
}

async function register_email(userId, data) {
  const collection = await db('user')
  const result = await collection.updateOne({_id: userId}, {$set: data})
  return result
}

async function register_setInfo(userId, data) {
  const collection = await db('user')
  const result = await collection.updateOne({_id: userId}, {$set: data})
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
