const mongodb= require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoConnect = (callback)=>{MongoClient.connect('mongodb+srv://tej:tpa4401@first-bvv78.gcp.mongodb.net/test?retryWrites=true&w=majority')
    .then(result => {
    console.log('connected');
    callback(client);
    })
    .catch(err => {
    // console.log(err);
    });};
    module.exports = mongoConnect