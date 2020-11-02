const mongoose = require('mongoose');

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env;

const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
}



exports.connect = (dbName) => {

    let url;
    if(dbName) {
        url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${dbName}?authSource=admin`;
    } else {
        url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
    }

    mongoose.connect(url, options)
    .then(() => {
        console.log('dbName -> ', dbName);
        console.log('mongo connected');
    })
    .catch((err) => {
        console.log(err);
    });
}


exports.clearTestDb = async () => {
    
    await mongoose.connection.dropDatabase();
}
