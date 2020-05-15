const db = require('../db/dbInstance')
const moment = require('moment')

async function list(query) {
  const { page, limit, start , end, orderWord, order } = query
  const instance = await db('creative')
  const collection = instance.collection
  let result = []
  // const test = await collection.find({ createTime: {'$gte': start, '$lte': end}})
  // console.log(test)
  if (orderWord) {
    result = await collection.find({ createTime: {'$gte': start, '$lte': end}}).skip((+page - 1) * +limit).limit(+limit).order({ [orderWord]: order === 'asc' ? 1 : -1 }).toArray()
  } else {
    result = await collection.find({ createTime: {'$gte': start, '$lte': end}}).skip((+page - 1) * +limit).limit(+limit).toArray()
  }
  if (start && end) {
    result = result
  }
  return result
}

module.exports = {
  list
}
