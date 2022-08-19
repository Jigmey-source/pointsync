import { Router } from 'express';
const router = Router();

import snapshots from '../models/snapshots.js';
import feeds from '../models/feeds.js';
import post from '../models/post.js';

import Route from '../const/route.js';

const routes = new Route();

router.post(routes.snapshots, async function (req, res) {
    snapshots.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$snaps' },
        { $replaceRoot: { newRoot: '$snaps' } },
        { $sort: { 'timestamp': -1 } }
    ], function (e, doc) {
        if (e) {
            const response = { message: 'Error loading snapshots' }
            res.json(response);
        } else {
            res.json(doc);
        }
    });
});
router.post(routes.profilemarker, async function (req, res) {
    snapshots.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$snaps' },
        { $replaceRoot: { newRoot: '$snaps' } },
        { $sort: { 'timestamp': -1 } },
        { $match: { lat: { $exists: true } } }
    ], function (e, doc) {
        if (e) {
            console.log('eeeeeeeeeeeeeeeeeeeeeeee' + e);
            const response = { message: 'Error loading snapshots' }
            res.json(response);
        } else {
            console.log(doc);
            res.json(doc);
        }
    });
});

router.post(routes.feeds, async function (req, res) {
    const page = req.query.get || 0;
    const perPage = 20;
    feeds.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$feeds' },
        { $sort: { timestamp: -1 } },
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

router.post(routes.markers, async function (req, res) {
    const page = req.query.get || 0;
    const perPage = 20;
    feeds.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$feeds' },
        { $sort: { timestamp: -1 } },
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

router.post(routes.posts, async function (req, res) { 
    console.log('post post post post post post post post');
    console.log(req.body);
    post.findOne({ link: req.body.link }, function (e, doc) { 
        if (e) {
            console.log('Error getting post: ' + e);
            res.json(e);
        } else { 
            console.log(doc);
            res.json(doc);
        }
    })
})

export default router;
