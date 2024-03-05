import express from 'express';
const app = express();

import mongoose from 'mongoose';
const { connect } = mongoose;

import bodyParser from 'body-parser';
const { urlencoded, json } = bodyParser;

import admin from 'firebase-admin';

app.use(urlencoded({ extended: false }));
app.use(json());

import create from './create/routes.js';
import read from './read/routes.js';
import update from './update/routes.js';
//cant name the import to delete because [delete] is a javascript operator
import erase from './delete/routes.js';

const serviceAccount = "./pointsync-5d5bf-firebase-adminsdk-sta42-140fb8a7fc.json";
const mongodb = "mongodb+srv://jigmey:fr33t1b3t@cluster0.bsbuyml.mongodb.net/Pointsync?retryWrites=true&w=majority";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "pointsync-5d5bf.appspot.com",
});

const connectmongodb = async () => {
    console.log('inside connecting mongodb function');
    try {
        const conn = await connect(mongodb);
        console.log(`MONGODB connection secured : ${conn.connection.host}`);
    } catch (e) { 
        console.log(`There seems to be an error connecting to mongodb : ${error}`);
        process.exit(1);
    }
    console.log('mongodb connection after the try catch finished');
};

connectmongodb();

console.log('above the create method');
app.use('/create', create);
console.log('below the create method');
app.use('/read', read);
app.use('/update', update);
app.use('/delete', erase);

app.use('/', (req, res) => {
    const response = { message: "start this party now" }
    console.log('muahhahahahahhahahaahhhash');
    res.json(response);
});

const port = process.env.PORT || 5500;
const server = app.listen(port, function () {
    console.log('server started at: ' + port);
});

process.on("unhandledRejection", (error, promise) => {
    console.log(`SEEMS TO BE AN ERROR: ${error}`);
    server.close(() => process.exit(1));
});
