import { Router } from 'express';
const router = Router();
import admin from 'firebase-admin';
import Route from '../const/route.js';

import user from '../models/user.js';
import notifications from '../models/notifications.js';

const routes = new Route();

router.post(routes.get, async function (req, res) {
    const page = req.query.get || 0;
    const perPage = 20;
    notifications.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$notifications' },
        { $replaceRoot: { newRoot: '$notifications' } },
        { $sort: { 'timestamp': -1 } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            console.log('Error getting notifications: ' + e);
            res.json(e);
        } else {
            console.log('NOTIFICATIONS: ' + doc);
            res.json(doc);
        }
    })
});

router.post(routes.users, async function (req, res) {
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
        { $push: { notifications: req.body } },
        { upsert: true },
    ).catch(function (e) {
        console.log('Error adding new notification: ' + e);
    });
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
});

router.post(routes.deletespecific, async function (req, res) {
    var data = datastructure(req);
    try {
        updatenotifications(req.body.id, data);
        res.json(data);
    } catch (e) {
        console.log('ERROR DELETING SPECIFIC NOTIFICATION: ' + e);
        res.json(e);
    }
});

function datastructure(req) {
    var data = { mediaurl: req.body.link, userId: req.body.userId }
    if (req.body.comment != null) {
        data.comment = req.body.comment
    } else if (req.body.review != null) {
        data.review = req.body.review
    } else {
        data.type = req.body.type
    }
    return data;
}

function updatenotifications(id, data) {
    notifications.updateOne(
        { userId: id },
        { $pull: { 'notifications': data } },
    ).catch(function (e) {
        console.log('Error deleting notification: ' + e);
    });
}

router.post(routes.seen, async function (req, res) {
    notifications.updateMany(
        { userId: req.body.id },
        { $set: { 'notifications.$[el].seen': true } },
        { arrayFilters: [{ 'el.userId': req.body.userId, 'el.type': req.body.type }] },
        function (e, doc) {
            if (e) {
                console.log('Error setting seen: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
});

export default router;