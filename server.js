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
import post from './routes/post.js';
import record from './routes/record.js';
import user from './routes/user.js';
import search from './routes/search.js';
import edit from './routes/edit.js';
import store from './routes/store.js';
import locality from './routes/locality.js';
import notify from './routes/notify.js';
import deleteuser from './routes/delete.js';

const serviceAccount = "./pointsync-5d5bf-firebase-adminsdk-sta42-140fb8a7fc.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "pointsync-5d5bf.appspot.com",
});

try {
    // connect('mongodb://mongo:SANi5qe0QzpPmAQYiIrI@containers-us-west-41.railway.app:5500');
    connect('mongodb+srv://jigmey:fr33t1b3t@cluster0.bsbuyml.mongodb.net/Pointsync?retryWrites=true&w=majority');
} catch (e) {
    console.log(e);
} finally {
    // app.use('/', (req, res) => {
    //     const response = { message: "start this shit" }
    //     res.json(response);
    // });

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
};

const port = process.env.PORT || 5500;
app.listen(port, function () {
    console.log('server started at: ' + port);
});
