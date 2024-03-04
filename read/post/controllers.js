import feeds from "../../models/feeds";
import icons from "../../models/icons";
import likes from "../../models/likes";
import post from "../../models/post";
import snapshots from "../../models/snapshots";

export const localityposts = async (req, res) => { 
    const page = req.query.get || 0;
    const perPage = 20;
    icons.aggregate([
        { $match: { locality: req.body.locality, adminArea: req.body.adminArea } },
        { $unwind: '$icons' },
        { $replaceRoot: { newRoot: '$icons' } },
        { $sort: { 'timestamp': -1 } },
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

export const checklike = async (req, res) => { 
    likes.findOne(
        { link: req.body.link, 'likes.userId': req.body.userId },
    ).then(function (doc) {
        console.log('Inside CheckLike: ' + doc);
        res.json(doc);
    }).catch(function (e) {
        console.log('Error CheckingLike: ' + e);
        res.json(e);
    });
}

export const post = async (req, res) => {
    post.findOne({ link: req.body.link }, function (e, doc) {
        if (e) {
            console.log('Error getting post: ' + e);
            res.json(e);
        } else {
            console.log(doc);
            res.json(doc);
        }
    });
}

export const snapshots = async (req, res) => { 
    const page = req.query.get || 0;
    const perPage = 20;
    snapshots.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$snaps' },
        { $replaceRoot: { newRoot: '$snaps' } },
        { $sort: { 'timestamp': -1 } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            res.json('Error loading snapshots: ' + e);
        } else {
            res.json(doc);
        }
    });
}

export const landmarks = async (req, res) => { 
    const page = req.query.get || 0;
    const perPage = 1;
    snapshots.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$snaps' },
        { $replaceRoot: { newRoot: '$snaps' } },
        { $match: { lat: { $exists: true } } },
        { $sort: { 'timestamp': -1 } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            res.json('Error loading landmarks: ' + e);
        } else {
            res.json(doc);
        }
    });
}

export const feeds = async (req, res) => { 
    const page = req.query.get || 0;
    const perPage = 20;
    feeds.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$feeds' },
        { $replaceRoot: { newRoot: '$feeds' } },
        { $sort: { 'timestamp': -1 } },
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

export const markers = async (req, res) => { 
    const page = req.query.get || 0;
    const perPage = 20;
    feeds.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$feeds' },
        { $replaceRoot: { newRoot: '$feeds' } },
        { $match: { lat: { $exists: true } } },
        { $sort: { 'timestamp': -1 } },
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

export const comments = async (req, res) => { 
    const page = req.query.get || 0;
    const perPage = 20;
    post.aggregate([
        { $match: { link: req.body.link } },
        { $unwind: '$comments' },
        { $replaceRoot: { newRoot: '$comments' } },
        { $sort: { 'timestamp': -1 } },
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

export const likes = async (req, res) => { 
    const page = req.query.get || 0;
    const perPage = 20;
    likes.aggregate([
        { $match: { link: req.body.link } },
        { $unwind: '$likes' },
        { $replaceRoot: { newRoot: '$likes' } },
        { $sort: { 'timestamp': -1 } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            console.log('Error getting likes: ' + e);
            res.send(500, e);
        } else {
            console.log(doc);
            res.json(doc);
        }
    });
}