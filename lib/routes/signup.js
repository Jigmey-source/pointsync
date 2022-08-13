import { Router } from 'express';
const router = Router();

import comments from '../models/comments.js';
import likes from '../models/likes.js';
import posts from '../models/posts.js';
import feeds from '../models/feeds.js';
import followers from '../models/followers.js';
import notifications from '../models/notifications.js';
import reviews from '../models/reviews.js';
import user from '../models/user.js';

import Route from '../const/route.js';

const routes = new Route();

router.post(routes.signUp, async function (req, res) {
    const muser = new user({
        group: req.body.group,
        placemarker: req.body.placemarker,
        name: req.body.name,
        searchKey: req.body.searchKey,
        token: req.body.token,
        userId: req.body.userId,
    });
    try {
        await muser.save().then(
            (_) => {
                createCollections(req.body.userId);
            }, (onrejected) => {
                console.log('SignUp rejected');
            }
        );
        console.log("New User has been created");
    } catch (e) {
        console.log('ERROR: creating new user ' + e);
    }
});

function createCollections(userId) {
    const posts = new posts({ userId: userId });
    const notifications = new notifications({ userId: userId });
    const feeds = new feeds({ userId: userId });
    const followers = new followers({ userId: userId });
}
