import { Router } from 'express';
const router = Router();
import admin from 'firebase-admin';
import Route from '../const/route.js';

import user from '../models/user.js';
import notifications from '../models/notifications.js';

const routes = new Route();

router.post(routes.users, async function (req, res) {
    console.log('what is the id: ' + req.body.id);
    try {
        const token = await getToken(req.body.id);
        addnotification(req);
        buildnotification(req, token);
        res.json('Success');
    } catch (e) {
        console.log('What is the error getTOKEN: ' + e);
        res.json(e);
    }
});

async function getToken(id) {
    var token;
    const doc = await user.findOne(
        { userId: id },
        function (e, doc) {
            if (e) {
                console.log('Error getting token from user: ' + e);
            } else {
                return doc;
            }
        }
    ).clone();
    token = doc['token'];

    return token;
}

function addnotification(req) {
    notifications.updateOne(
        { userId: req.body.id },
        { notifications: req.body },
        { upsert: true },
        function (e, result) {
            if (e) {
                console.log('Error adding new notification: ' + e);
            } else {
                console.log('Successfully added notification');
            }
        }
    );
}

function buildnotification(req, token) {
    try {
        const message = {
            token: token,
            notification: {
                title: req.body.notificationtitle, body: req.body.notificationbody,
                image: req.body.mediaurl,
            },
        };
        admin.messaging()
            .send(message)
            .then((response) => console.log("Successfully sent message:", response));
    } catch (e) {
        console.log("Error sending message: ", e);
    }
}

router.post(routes.delete, async function (req, res) {
    console.log('inside notification delete function');
    console.log(req.body);
    notifications.updateOne(
        { userId: req.body.id },
        { $pull: { 'notifications': { type: req.body.type, userId: req.body.userId } } },
        function (e, result) {
            if (e) {
                console.log('Error deleting notification: ' + e);
                res.json(e);
            } else {
                console.log('Successfully deleted notification');
                res.json(result);
            }
        }
    );
})

export default router;