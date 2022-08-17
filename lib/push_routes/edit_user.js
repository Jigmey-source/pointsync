import { Router } from 'express';
const router = Router();

import Route from '../const/route.js';

import user from '../models/user.js';

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

router.post(routes.updatedescription, async function (req, res) {
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
        { $set: { 'imageUrl': req.body.imageUrl } },
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

export default router;
