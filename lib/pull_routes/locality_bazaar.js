import { Router } from 'express';
const router = Router();

import posts from '../models/posts.js';
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
        {
            $match: {
                locality: req.body.locality,
                adminArea: req.body.adminArea,
                $or: [
                    { 'record.title': { $regex: '^' + req.body.searchKey, $options: 'i' } },
                    { 'record.type': { $regex: '^' + req.body.searchKey, $options: 'i' }, }
                ]
            }
        },
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
    records.find(
        { locality: { $regex: '^' + req.body.searchKey, $options: 'i' } },
        function (e, doc) {
            if (e) {
                res.send(500, e);
            } else {
                res.json(doc);
            }
        });
});

router.post(routes.onlineusers, async function (req, res) {
    user.aggregate([
        {
            $match: {
                'placemarker.locality': req.body.locality,
                'placemarker.adminArea': req.body.adminArea,
                'placemarker.online': true,
            }
        },
        { $group: { _id: null, uniqueValues: { $addToSet: "$group" } } },
        function (e, doc) {
            if (e) {
                console.log('eeeeeeee' + e);
                res.json(e);
            } else {
                console.log(doc);
                res.json(doc);
            }
        }
    ]);
    // user.aggregate([
    //     {
    //         $match: {
    //             'placemarker.locality': req.body.locality,
    //             'placemarker.adminArea': req.body.adminArea,
    //             'placemarker.online': true,
    //         }
    //     },
    //     { }
    // ])
})

export default router;
