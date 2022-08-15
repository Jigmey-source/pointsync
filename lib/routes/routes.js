import { Router } from 'express';
const router = Router();

import Route from '../const/route.js';

import comments from '../models/comments.js';
import feeds from '../models/feeds.js';
import followers from '../models/followers.js';
import likes from '../models/likes.js';
import records from '../models/records.js';
import reviews from '../models/reviews.js';
import user from '../models/user.js';
import posts from '../models/posts.js';

const routes = new Route();

const perPage = 3;

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
        await muser.save();
        const response = { message: "New User has been created" };
        res.json(response);
    } catch (e) {
        console.log('ERROR: creating new user ' + e);
        res.json(e);
    }
});
router.post(routes.feeds, async function (req, res) {
    const page = req.query.get || 0;
    const perPage = 20;
    feeds.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$feeds' },
        { $sort: { time_stamp: -1 } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            res.send(500, e);
        } else {
            res.json(doc);
        }
    });
});

export default router;
