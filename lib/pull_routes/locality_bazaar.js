import { Router } from 'express';
const router = Router();

import posts from '../models/posts.js';
import records from '../models/records.js';
import searchhistory from '../models/search_history.js';

import Route from '../const/route.js';

const routes = new Route();

router.post(routes.stores, async function (req, res) {
    const page = req.query.get || 0;
    const perPage = 20;
    records.aggregate([
        { $match: { locality: req.body.locality, adminArea: req.body.adminArea } },
        { $unwind: '$record' },
        { $replaceRoot: { newRoot: '$record' } },
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
    posts.aggregate([
        { $match: { locality: req.body.locality, adminArea: req.body.adminArea } },
        { $unwind: '$snaps' },
        { $replaceRoot: { newRoot: '$snaps' } },
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

router.post(routes.search, async function (req, res) {
    const page = req.query.get || 0;
    const perPage = 20;
    records.aggregate([
        { $match: { locality: req.body.locality, adminArea: req.body.adminArea, 'record.searchKey': req.body.searchKey } },
        { $unwind: '$record' },
        { $replaceRoot: { newRoot: '$record' } },
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

router.post(routes.searched_places, async function (req, res) {
    searchhistory.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$places' },
        { $replaceRoot: { newRoot: '$places' } },
        { $sort: { 'time_stamp': -1 } }
    ], function (e, doc) {
        if (e) {
            res.json(e)
        } else {
            res.json(doc);
        }
    });
});

router.post(routes.searchplaces, async function (req, res) {
    const searchKey = JSON.stringify(req.body.searchKey);
    records.find(
        { locality: { $regex: /searchKey/i } },
        function (e, doc) {
            if (e) {
                console.log('lllllllllllllllllllllllllllllllllllllllll');
                console.log(e);
                res.send(500, e);
            } else {
                console.log('muahahahahahahaahahahahh');
                console.log(JSON.stringify(req.body.searchKey));
                console.log(doc);
                res.json(doc);
            }
        }
    )
    // records.find(
    //     { searchKey: req.body.searchKey },
    //     function (e, doc) {
    //         if (e) {
    //             res.send(500, e);
    //         } else {
    //             res.json(doc);
    //         }
    //     })
});

export default router;
