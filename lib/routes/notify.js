import { Router } from 'express';
const router = Router();
import admin from 'firebase-admin';
import Route from '../const/route.js';
import notifications from '../models/notifications.js';

const routes = new Route();

router.post(routes.users, async function (req, res) {
    try { 
        addnotification(req);
        buildnotification(req);
        res.json('Success');
    } catch (e) {
        res.json(e);
    }
});

function addnotification(req) {
    notifications.updateOne(
        { userId: req.body.id },
        { notifications: req.body },
        { upsert: true, new: true },
        function (e, result) {
            if (e) {
                console.log('Error notifying newfollower: ' + e);
            } else {
                console.log('Successfully sent following notification');
            }
        }
    );
}

function buildnotification(req) {
    try {
        const message = {
            token: req.body.token,
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
        { $pull: { 'notifications': { type: req.type, userId: req.body.userId } } },
        function (e, result) {
            if (e) {
                console.log('Error deleting notification: ' + e);
            } else {
                console.log('Successfully deleted notification');
            }
        }
    );
})

export default router;