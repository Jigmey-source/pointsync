import express from 'express';
const app = express();

import mongoose from 'mongoose';
const { connect } = mongoose;

import bodyParser from 'body-parser';
const { urlencoded, json } = bodyParser;

app.use(urlencoded({ extended: false }));
app.use(json());

import routes from './push_routes/routes.js';
import edituser from './push_routes/edit_user.js';
import postroutes from './push_routes/post_requests.js';
import recordroutes from './push_routes/record_requests.js';
import user_routes from './push_routes/user_requests.js';

import pulldocs from './pull_routes/locality_bazaar.js';
import pullposts from './pull_routes/pull_posts.js';

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
    app.use('/post', postroutes);
    app.use('/record', recordroutes);
    app.use('/user', user_routes);
    app.use('/edit_user', edituser);
    app.use('/locality', pulldocs);
    app.use('/posts', pullposts);
};

const port = process.env.PORT || 78;
app.listen(port, function () {
    console.log('server started at: ' + port );
});
