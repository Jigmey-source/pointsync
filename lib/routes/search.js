import { Router } from 'express';
const router = Router();

import Route from '../const/route.js';

import user from '../models/user.js';
import records from '../models/records.js';
import searchhistory from '../models/search_history.js';

const routes = new Route();

router.post(routes.usertosearch, async function (req, res) {
    const data = {
        link: req.body.link,
        name: req.body.name,
        userId: req.body.userId,
    };
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(req.body);
    try {
        searchhistory.updateOne(
            //req.body.id is the id of the client
            //req.body.useId is the id of the user that the client has searched for
            { userId: req.body.id },
            { $push: { users: data } },
            { upsert: true, new: true },
            function (e, result) {
                if (e) {
                    console.log('Error adding user to search: ' + e);
                } else {
                    console.log('New user added');
                }
            }
        );
        res.json(req.body);
    } catch (e) {
        res.json(e);
    }
});

router.post(routes.placetosearch, async function (req, res) {
    const data = {
        locality: req.body.locality,
        adminArea: req.body.adminArea,
        country: req.body.country,
    };
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(req.body);
    try {
        searchhistory.updateOne(
            { userId: req.body.userId },
            { $push: { places: data } },
            { upsert: true, new: true },
            function (e, result) {
                if (e) {
                    console.log('Error adding place to search: ' + e);
                } else {
                    console.log('New place added');
                }
            }
        );
        res.json(req.body);
    } catch (e) {
        res.json(e);
    }
});

router.post(routes.storetosearch, async function (req, res) {
    const data = {
        title: req.body.title,
        type: req.body.type,
    };
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(req.body);
    try {
        searchhistory.updateOne(
            { userId: req.body.userId },
            { $push: { stores: data } },
            { upsert: true, new: true },
            function (e, result) {
                if (e) {
                    console.log('Error adding store to search: ' + e);
                } else {
                    console.log('New store added');
                }
            }
        );
        res.json(req.body);
    } catch (e) {
        res.json(e);
    }
});

router.post(routes.userfromsearch, async function (req, res) {
    searchhistory.updateOne(
        { userId: req.body.userId },
        { $pull: { 'users': { userId: req.body.id } } },
        function (e, doc) {
            if (e) {
                console.log('Error removing from search history: ' + e);
            } else {
                console.log(doc);
            }
        }
    )
});

router.post(routes.placefromsearch, async function (req, res) {
    searchhistory.updateOne(
        { userId: req.body.userId },
        { $pull: { 'places': { locality: req.body.locality, adminArea: req.body.adminArea } } },
        function (e, doc) {
            if (e) {
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
});

router.post(routes.searched_users, async function (req, res) {
    searchhistory.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$users' },
        { $replaceRoot: { newRoot: '$users' } },
        { $sort: { 'timestamp': -1 } }
    ], function (e, doc) {
        if (e) {
            res.json(e)
        } else {
            res.json(doc);
        }
    });
});

router.post(routes.searchusers, async function (req, res) {
    user.aggregate([
        { $match: { name: { $regex: '^' + req.body.searchKey, $options: 'i' } } }
    ], function (e, doc) {
        if (e) {
            res.json(e);
        } else {
            res.json(doc);
        }
    })
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

router.post(routes.searched_places, async function (req, res) {
    searchhistory.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$places' },
        { $replaceRoot: { newRoot: '$places' } },
        { $sort: { 'timestamp': -1 } }
    ], function (e, doc) {
        if (e) {
            res.json(e)
        } else {
            res.json(doc);
        }
    });
});

router.post(routes.searchrecord, async function (req, res) {
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

export default router;