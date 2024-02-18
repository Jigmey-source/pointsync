import express from 'express';
const app = express();

import mongoose from 'mongoose';
const { connect } = mongoose;

import bodyParser from 'body-parser';
const { urlencoded, json } = bodyParser;

import admin from 'firebase-admin';

app.use(urlencoded({ extended: false }));
app.use(json());

import routes from './controllers/routes.js';
import post from './controllers/post.js';
import record from './controllers/record.js';
import user from './controllers/user.js';
import search from './controllers/search.js';
import edit from './controllers/edit.js';
import store from './controllers/store.js';
import locality from './controllers/locality.js';
import notify from './controllers/notify.js';
import deleteuser from './controllers/delete.js';

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

app.use('/', routes);
app.use('/post', post);
app.use('/record', record);
app.use('/user', user);
app.use('/edit', edit);
app.use('/locality', locality);
app.use('/store', store);
app.use('/search', search);
app.use('/notify', notify);
app.use('/delete', deleteuser);

app.use('/', (req, res) => {
    const response = { message: "start this party now" }
    console.log('muahhahahahahhahahaahhhash');
    res.json(response);
});

// try {
//     connect(mongodb);
// } catch (e) {
//     console.log(e);
// } finally {
//     app.use('/', routes);
//     app.use('/post', post);
//     app.use('/record', record);
//     app.use('/user', user);
//     app.use('/edit', edit);
//     app.use('/locality', locality);
//     app.use('/store', store);
//     app.use('/search', search);
//     app.use('/notify', notify);
//     app.use('/delete', deleteuser);

//     app.use('/', (req, res) => {
//         const response = { message: "start this party now" }
//         console.log('muahhahahahahhahahaahhhash');
//         res.json(response);
//     });
// };

const port = process.env.PORT || 5500;
const server = app.listen(port, function () {
    console.log('server started at: ' + port);
});

process.on("unhandledRejection", (error, promise) => {
    console.log(`SEEMS TO BE AN ERROR: ${error}`);
    server.close(() => process.exit(1));
});
