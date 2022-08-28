import express from 'express';
const app = express();

import mongoose from 'mongoose';
const { connect } = mongoose;

import bodyParser from 'body-parser';
const { urlencoded, json } = bodyParser;

import admin from 'firebase-admin';

app.use(urlencoded({ extended: false }));
app.use(json());

import routes from './routes/routes.js';
import postrequests from './routes/post_requests.js';
import record from './routes/record.js';
import user from './routes/user.js';
import search from './routes/search.js';
import edit from './routes/edit.js';
import store from './routes/store.js';
import locality from './routes/locality.js';

import post from './pull_routes/post.js';

const serviceAccount = "./lib/pointsync-5d5bf-firebase-adminsdk-sta42-140fb8a7fc.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "pointsync-5d5bf.appspot.com",
});

try {
    connect('mongodb+srv://jigmey:fr33t1b3t@cluster0.bsbuyml.mongodb.net/Pointsync?retryWrites=true&w=majority');
} catch (e) {
    console.log(e);
} finally {
    app.get('/', function (req, res) {
        const response = { message: "Pointsync Server on Heroku" };
        res.json(response);
    });

    app.use('/', routes);
    app.use('/post', postrequests);
    app.use('/record', record);
    app.use('/user', user);
    app.use('/edit', edit);
    app.use('/locality', locality);
    app.use('/posts', post);
    app.use('/store', store);
    app.use('/search', search);
};

const port = process.env.PORT || 78;
app.listen(port, function () {
    console.log('server started at: ' + port );
});
