import { Router } from 'express';
const router = Router();

import icons from '../models/icons.js';
import records from '../models/records.js';
import user from '../models/user.js';
import searchhistory from '../models/search_history.js';

import Route from '../const/route.js';

const routes = new Route();

router.post(routes.stores, async function (req, res) {
    const page = req.query.get || 0;
    const perPage = 20;
    records.aggregate([
        { $match: { locality: req.body.locality, adminArea: req.body.adminArea } },
        { $unwind: '$records' },
        { $replaceRoot: { newRoot: '$records' } },
        { $match: { point: 'Business' } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            res.send(500, e);
        } else {
            res.json(doc);
        }
    })
});

router.post(routes.posts, async function (req, res) {
    const page = req.query.get || 0;
    const perPage = 20;
    icons.aggregate([
        { $match: { locality: req.body.locality, adminArea: req.body.adminArea } },
        { $unwind: '$icons' },
        { $replaceRoot: { newRoot: '$icons' } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            res.send(500, e);
        } else {
            res.json(doc);
        }
    })
});

router.post(routes.onlineusers, async function (req, res) {
    user.find(
        {
            'placemarker.locality': req.body.locality,
            'placemarker.adminArea': req.body.adminArea,
            'placemarker.online': true,
        }
    ).distinct('group', function (e, doc) {
        if (e) {
            console.log('eeeeeeee' + e);
            res.json(e);
        } else {
            console.log(doc);
            res.json(doc);
        }
    });
});

router.post(routes.online, async function (req, res) {
    const page = req.query.get || 0;
    const perPage = 20;
    user.aggregate([
        {
            $match: {
                group: req.body.group,
                'placemarker.locality': req.body.locality,
                'placemarker.adminArea': req.body.adminArea,
                'placemarker.online': true,
            }
        },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            console.log('asdlk;fjasdfasdfsd: ' + e);
            res.send(500, e);
        } else {
            console.log(doc);
            res.json(doc);
        }
    });
});

export default router;
