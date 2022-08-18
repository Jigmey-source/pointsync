import { Router } from 'express';
const router = Router();

import stores from '../models/store.js';
import catalogues from '../models/catalogues.js';
import recommends from '../models/recommends.js';
import Route from '../const/route.js';

const routes = new Route();

router.post(routes.get, async function (req, res) {
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(req.body.link);
    stores.findOne({ link: req.body.link }, function (e, doc) {
        if (e) {
            console.log('Error getting Store: ' + e);
            res.json(e);
        } else {
            console.log(doc);
            res.json(doc);
        }
    });
});

router.post(routes.recommend, async function (req, res) {
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(req.body.link);
    // recommends.findOne({ link: req.body.link }, function (e, doc) {
    //     if (e) {
    //         console.log('Error getting Store: ' + e);
    //         res.json(e);
    //     } else {
    //         console.log(doc);
    //         res.json(doc);
    //     }
    // });
    recommends.aggregate([
        { $match: { link: req.body.link, 'commends.userId': req.body.userId } },
    ], function (e, doc) {
        if (e) {
            console.log('Error getting catalogue: ' + e);
            res.send(500, e);
        } else {
            console.log(doc);
            res.json(doc);
        }
    })
});

router.post(routes.catalogue, async function (req, res) {
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(req.body.link);
    const page = req.query.get || 0;
    const perPage = 20;
    catalogues.aggregate([
        { $match: { link: req.body.link } },
        { $unwind: '$catalogue' },
        { $replaceRoot: { newRoot: '$catalogue' } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            console.log('Error getting catalogue: ' + e);
            res.send(500, e);
        } else {
            console.log(doc);
            res.json(doc);
        }
    })
});

export default router;