import { Router } from 'express';
const router = Router();

import user from '../models/user.js';
import post from '../models/post.js';
import icons from '../models/icons.js';
import likes from '../models/likes.js';
import feeds from '../models/feeds.js';
import followers from '../models/followers.js';
import snapshots from '../models/snapshots.js';
import records from '../models/records.js';
import Route from '../const/route.js';

const routes = new Route();

router.post(routes.updatename, async function (req, res) {
    user.findOneAndUpdate(
        { userId: req.body.userId },
        { $set: { 'name': req.body.name } },
        function (e, doc) {
            if (e) {
                console.log('Error updating name: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
});

router.post(routes.updatebio, async function (req, res) {
    user.findOneAndUpdate(
        { userId: req.body.userId },
        { $set: { 'description': req.body.description } },
        function (e, doc) {
            if (e) {
                console.log('Error updating description: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
});

router.post(routes.updateprofilepicture, async function (req, res) {
    user.findOneAndUpdate(
        { userId: req.body.userId },
        { $set: { 'link': req.body.link } },
        function (e, doc) {
            if (e) {
                console.log('Profile picture: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
});

router.post(routes.updategroup, async function (req, res) {
    user.findOneAndUpdate(
        { userId: req.body.userId },
        { $set: { 'group': req.body.group, 'placemarker.online': false } },
        function (e, doc) {
            if (e) {
                console.log('New Group: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
});

router.post(routes.updatepostdescription, async function (req, res) {
    post.findOneAndUpdate(
        { link: req.body.link },
        { $set: { 'description': req.body.description } },
        function (e, doc) {
            if (e) {
                console.log('Post description: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
});

router.post(routes.updaterecorddescription, async function (req, res) {
    records.updateOne(
        { 'records.link': req.body.link },
        { $set: { 'records.$[el].description': req.body.description } },
        { arrayFilters: [{ 'el.link': req.body.link }] },
        { upsert: true },
        function (e, doc) {
            if (e) {
                console.log('Error Updatedescription: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
});

router.post(routes.updateevent, async function (req, res) {
    records.updateOne(
        { 'records.link': req.body.link },
        { $set: { 'records.$[el].event': req.body.event } },
        { arrayFilters: [{ 'el.link': req.body.link }] },
        { upsert: true },
        function (e, doc) {
            if (e) {
                console.log('Error UpdateEvent: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
});

router.post(routes.updateimage, async function (req, res) {
    console.log('updating record image');
    console.log(req.body);
    records.updateOne(
        { 'records.link': req.body.link },
        { $set: { 'records.$[el].link': req.body.common } },
        { arrayFilters: [{ 'el.link': req.body.link }] },
        function (e, doc) {
            if (e) {
                console.log('Error UpdateImage: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
});

export default router;
