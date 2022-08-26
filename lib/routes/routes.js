import { Router } from 'express';
const router = Router();

import Route from '../const/route.js';

import user from '../models/user.js';
import reports from '../models/reports.js';

const routes = new Route();

const perPage = 3;

router.post(routes.signUp, async function (req, res) {
    const muser = new user({
        group: req.body.group,
        placemarker: req.body.placemarker,
        name: req.body.name,
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

router.post(routes.savetoken, async function (req, res) {
    user.updateOne(
        { userId: req.body.userId },
        { $set: { token: req.body.token } },
        function (e, doc) {
            if (e) {
                console.log('Error saving token: ' + e);
                res.json(e);
            } else {
                console.log('token successfully saved');
                res.json(doc);
            }
        }
    )
});

router.post(routes.alter, async function (req, res) {
    const data = {
        online: false,
        locality: req.body.locality,
        adminArea: req.body.adminArea,
        country: req.body.country,
        lat: req.body.lat,
        lng: req.body.lng,
    }
    user.updateOne(
        { userId: req.body.userId },
        { $set: { token: req.body.token, placemarker: data } },
        function (e, doc) {
            if (e) {
                console.log('Error altering user: ' + e);
                res.json(e);
            } else {
                console.log('User altered successfully');
                res.json(doc);
            }
        }
    )
});

router.post(routes.relocated, async function (req, res) {
    const data = {
        online: false,
        country: req.body.country,
        locality: req.body.locality,
        adminArea: req.body.adminArea,
        lat: req.body.lat,
        lng: req.body.lng,
    }

    user.updateOne(
        { userId: req.body.userId },
        { $set: { placemarker: data } },
        function (e, doc) {
            if (e) {
                console.log('Error relocating user: ' + e);
                res.json(e);
            } else {
                console.log('User relocated successfully');
                res.json(doc);
            }
        }
    )
})

router.post(routes.reports, async function (req, res) {
    const report = new reports(req.body);
    try {
        await report.save();
        res.json(report)
    } catch (e) {
        console.log('Error Reports: ' + e);
        res.json(e);
    }
});

export default router;
