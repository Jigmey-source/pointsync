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
