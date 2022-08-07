import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Strings } from "./const/strings";

const user = require('./src/models/user');

const app = express();
const strings = new Strings();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(strings.mongouri).then(function () {
    app.get('/', function (req, res) {
        res.send('Home Page muhahaahahahah');
    });

    app.get('/users/add', async function (req, res) {
        const muser = new user({
            blocked: {},
            description: 'helloooo',
            followers: 5,
            following: {},
            group: 'Tibet',
            hideFrom: {},
            place_marker: {},
            posts: 7,
            name: 'goni',
            platform: {},
            profile_picture: {},
            userId: '007',
        });
        await muser.save();

        const response = { message: "New user added to users" };
        res.json(response);
    });

    app.get('/users', function (req, res) {
        var users = user.find();
        res.send(users);
    });
});

const PORT = process.env.PORT || 78;
app.listen(PORT, function () {
    console.log('server started at PORT:' + PORT);
});
