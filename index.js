const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);

    console.log('Connected correctly to the server');

    const db = client.db(dbname);

    dboper.insertDocument(db, {name: "donut", description: "test"}, 'dishes', (result) => {
        console.log('Insert Document:\n', result.ops);

        dboper.findDocuments(db, 'dishes', (docs) => {
            console.log('Found documents: \n', docs);

            dboper.updateDocument(db, {name: "donut"}, {description: "updated Test"}, 'dishes', (result) => {
                console.log('Updated Document:\n', result.result);
                
                dboper.findDocuments(db, 'dishes', (docs) => {
                    console.log('Found documents: \n', docs);

                    db.dropCollection('dishes', (result) => {
                        console.log('Dropped Collection:\n', result);
                        client.close();
                    })

                });

            })
        })
    })
});