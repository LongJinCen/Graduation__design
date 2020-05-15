const db = require('../db/dbInstance')
const moment = require('moment')
const ObjectId = require('mongodb').ObjectId

async function data(creativeId) {
  const instance = db('creative')
  const collection = instance.collection
  const result = await collection.find({ _id: ObjectId(creativeId)}).toArray()
  return result[0]
}

async function create(body, phoneNumber) {
  body = {
    phoneNumber,
    createTime: moment().format('YYYY-MM-DD'),
    ...body,
    consumption: 0,
    show: 0,
    clickNums: 0,
    clickRate: 0,
    convertNums: 0,
    convertRate: 0
  }
  const instance = db('creative')
  const collection = instance.collection
  const result = await collection
}

module.exports = {
  data
}