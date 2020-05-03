const env = process.env.NODE_ENV;
let MONGODB_CONFIG,
    REDIS_CONFIG;

if (env === 'development') {
    MONGODB_CONFIG = {
        url: 'mongodb://localhost:27017',
        dbName: 'ad'
    }
    REDIS_CONFIG = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    MONGODB_CONFIG = {
        url: 'mongodb://localhost:27017',
        dbName: 'ad'
    }
    REDIS_CONFIG = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MONGODB_CONFIG,
    REDIS_CONFIG
}