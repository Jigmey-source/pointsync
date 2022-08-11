import { Router } from 'express';
const router = Router();

import Strings from '../const/strings.js';

import comments from '../models/comments.js';
import feeds from '../models/feeds.js';
import followers from '../models/followers.js';
import likes from '../models/likes.js';
import notifications from '../models/notifications.js';
import posts from '../models/posts.js';
import records from '../models/records.js';
import reviews from '../models/reviews.js';
import user from '../models/user.js';

const strings = Strings();

router.post("/signUp", async function (req, res) {
    const muser = new user({
        group: req.body.group,
        placemarker: req.body.placemarker,
        name: req.body.name,
        searchKey: req.body.searchKey,
        token: req.body.token,
        userId: req.body.userId,
    });
    await muser.save();

    const response = { message: "New Note Created! " + `id: ${req.body.id}` };
    console.log('lllllllllllllllllllllllllllll: ' + req.body.placemarker);
    res.json(response);
});
router.post('/comments', async function (req, res) {
    comments.find({ userId: req.body.userId }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log('comments eeeeeeeeeeeeeeeeeeeeeeeee');
            res.json(doc);
        }
    });
});
router.post('/feeds', async function (req, res) {
    const page = req.query.get || 0;
    const perPage = 20;
    feeds.aggregate([
        { '$match': { userId: req.body.userId } },
        { '$unwind': '$feeds' },
        { '$sort': { timeStamp: -1 } },
        { '$skip': (page * perPage) },
        { '$limit': perPage },
    ], function (error, doc) {
        if (error) {
            return (res.send(500, error));
        } else {
            res.json(doc);
        }
    });
    // feeds.find({ userId: req.body.userId }, { sort: { timeStamp: -1 } }, {skip: (page *docsperPage)}.limit(booksPerPage)).sort({ timeStamp: -1 }).skip(page * docsperPage).limit(booksPerPage)
    // feeds.find({ userId: req.body.userId }, function (error, doc) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('feeds eeeeeeeeeeeeeeeeeeeeeeeee');
    //         res.json(doc);
    //     }
    // });
});
router.post('/followers', async function (req, res) {
    followers.find({ userId: req.body.userId }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log('followers eeeeeeeeeeeeeeeeeeeeeeeee');
            res.json(doc);
        }
    });
});
router.post('/likes', async function (req, res) {
    likes.find({ userId: req.body.userId }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log('likes eeeeeeeeeeeeeeeeeeeeeeeee');
            res.json(doc);
        }
    });
});
router.post('/notifications', async function (req, res) {
    notifications.find({ userId: req.body.userId }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log('notifications eeeeeeeeeeeeeeeeeeeeeeeee');
            res.json(doc);
        }
    });
});

router.post('/posts', async function (req, res) {
    posts.find({ userId: req.body.userId }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log('posts eeeeeeeeeeeeeeeeeeeeeeeee');
            res.json(doc);
        }
    });
});

router.post('/records', async function (req, res) {
    records.find({ userId: req.body.userId }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log('records eeeeeeeeeeeeeeeeeeeeeeeee');
            res.json(doc);
        }
    });
});

router.post('/reviews', async function (req, res) {
    reviews.find({ userId: req.body.userId }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log('reviews eeeeeeeeeeeeeeeeeeeeeeeee');
            res.json(doc);
        }
    });
});

router.post('/users', async function (req, res) {
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(req.body.userId);
    console.log(strings.user);
    user.findOne({ userId: req.body.userId }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn: ' + doc);
            res.json(doc);
        }
    });
});

router.post('searches/user', async function (req, res) {
    user.aggregate([
        { '$match': { userId: req.body.userId } },
        { '$unwind': '$searches' },
        { '*sort': { timeStamp: -1, type: strings.user } },
        { '$limit': perPage }
    ], function (error, doc) {
        if (error) {
            return (res.send(500, error));
        } else {
            res.json(doc);
        }
    });
});

router.post('/search/users', async function (req, res) {
    user.find({ searchKey: req.body.searchKey }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            res.json(doc);
        }
    })
});

export default router;
