import admin from 'firebase-admin';
import user from "../../models/user.js";

export async function getToken(id) {
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

export function buildnotification(req, token) {
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