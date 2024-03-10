import stores from "../../models/store.js";
import menus from "../../models/menus.js";
import records from "../../models/records.js";

export const store = async (req, res) => {
    stores.findOne({ link: req.body.link }, function (e, doc) {
        if (e) {
            console.log('Error getting Store: ' + e);
            res.json(e);
        } else {
            console.log('STORE GET: ' + doc);
            res.json(doc);
        }
    });
}

export const checkstar = async (req, res) => {
    stores.findOne(
        { link: req.body.link, 'commends.userId': req.body.userId },
        function (e, doc) {
            if (e) {
                console.log('CheckStar error: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
}

export const catalogue = async (req, res) => {
    const page = req.query.get || 0;
    const perPage = 20;
    menus.aggregate([
        { $match: { link: req.body.link } },
        { $unwind: '$catalogue' },
        { $replaceRoot: { newRoot: '$catalogue' } },
        { $sort: { 'averagerate': -1, 'recommendations': -1 } },
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
    });
}

export const reviews = async (req, res) => {
    const page = req.query.get || 0;
    const perPage = 20;
    stores.aggregate([
        { $match: { link: req.body.link } },
        { $unwind: '$reviews' },
        { $replaceRoot: { newRoot: '$reviews' } },
        { $sort: { 'timestamp': -1 } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            console.log('Error getting reviews: ' + e);
            res.send(500, e);
        } else {
            console.log(doc);
            res.json(doc);
        }
    });
}

export const commends = async (req, res) => {
    const page = req.query.get || 0;
    const perPage = 20;
    stores.aggregate([
        { $match: { link: req.body.link } },
        { $unwind: '$commends' },
        { $replaceRoot: { newRoot: '$commends' } },
        { $sort: { 'timestamp': -1 } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            console.log('Error getting commends: ' + e);
            res.send(e);
        } else {
            console.log('Successfully received commends');
            res.json(doc);
        }
    });
}

export const getstores = async (req, res) => {
    const page = req.query.get || 0;
    const perPage = 20;
    records.aggregate([
        { $match: { locality: req.body.locality, adminArea: req.body.adminArea } },
        { $unwind: '$records' },
        { $replaceRoot: { newRoot: '$records' } },
        { $match: { point: 'Business' } },
        { $sort: { 'averagerate': -1, 'recommendations': -1 } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            res.send(500, e);
        } else {
            res.json(doc);
        }
    });
}

export const newplaces = async (req, res) => {
    records.find(
        { locality: { $regex: '^' + req.body.searchKey, $options: 'i' } },
        function (e, doc) {
            if (e) {
                res.send(500, e);
            } else {
                res.json(doc);
            }
        });
}

export const searchrecord = async (req, res) => {
    const page = req.query.get || 0;
    const perPage = 20;
    records.aggregate([
        { $match: { locality: req.body.locality, adminArea: req.body.adminArea } },
        { $unwind: '$records' },
        { $replaceRoot: { newRoot: '$records' } },
        {
            $match: {
                $or: [
                    { title: { $regex: '^' + req.body.searchKey, $options: 'i' } },
                    { type: { $regex: '^' + req.body.searchKey, $options: 'i' } }
                ]
            }
        },
        { $sort: { 'averagerate': -1, 'recommendations': -1 } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            res.send(500, e);
        } else {
            res.json(doc);
        }
    });
}