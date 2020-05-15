const db = require('../db/dbInstance')

async function createDocuemnt(ctx, phoneNumber) {
  const instance = await db('indicators')
  const collection = instance.collection
  const result = await collection.insertMany([{
    phoneNumber,
    consumption: 0,
    show: 0,
    clickNums: 0,
    clickRate: 0,
    convertNums: 0,
    convertRate: 0
  }])
  if (result.result.n > 0) {
    return true
  }
}

async function getIndicators(phoneNumber) {
  const instance = await db('indicators')
  const collection = instance.collection
  const result = await collection.find({phoneNumber}).toArray()
  return result
}

module.exports = {
  createDocuemnt,
  getIndicators
}
