import { Router } from 'express';
const router = Router();

import stores from '../models/store.js';
import catalogues from '../models/catalogues.js';
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

router.post(routes.commends, async function (req, res) {
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(req.body.link);
    stores.findOne({ link: req.body.link, 'commends.userId': req.body.userId }, function (e, doc) {
        if (e) {
            console.log('Error getting Store: ' + e);
            res.json(e);
        } else {
            console.log('im here');
            console.log(doc);
            res.json(doc);
        }
    });
});

router.post(routes.recommend, async function (req, res) {
    console.log('inside recommend asdfasdfasdfasdf');
    console.log(req.body);
    console.log(req.body.common);
    const data = {
        userId: req.body.userId,
        name: req.body.name,
        link: req.body.link
    }

    try {
        const entry = await stores.findOne({ link: req.body.common });
        entry.commends.push(data);
        await entry.save();
        const response = { message: 'New recommendation added' + req.body.name }
        console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww');
        res.json(response);
    } catch (e) {
        console.log('Error recommending: ' + e);
        res.json(e);
    }
});

router.post(routes.decrement, async function (req, res) {
    console.log('opopopopopopopopopopopopopopopopo');
    console.log(req.body);
    stores.updateOne(
        { link: req.body.link },
        { $pull: { 'commends': { userId: req.body.userId } } },
        function (e, doc) {
            if (e) {
                console.log('Error decrementing: ' + e);
                res.json(e);
            } else {
                console.log('what is doc what is doc what is doc' + doc);
                res.json(doc);
            }
        }
    )
});

router.post(routes.newreview, async function (req, res) {
    console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
    console.log(req.body);
    const review = {
        name: req.body.name,
        link: req.body.link,
        rate: req.body.rate,
        userId: req.body.userId,
        review: req.body.review,
    };

    try {
        const entry = await stores.findOne({ link: req.body.common });
        entry.reviews.push(review);
        await entry.save();
        res.json(review);
    } catch (e) {
        console.log('Error addingreview: ' + e);
        res.json(e);
    }
});

router.post(routes.deletereview, async function (req, res) {
    console.log('deleting review mnadyusfasidfhjas');
    console.log(req.body);
    stores.findOneAndUpdate(
        { imageUrl: req.body.link },
        { $pull: { reviews: { userId: req.body.userId } } },
        function (e, doc) {
            if (e) {
                console.log('Error deletingreview: ' + e);
                res.json(e);
            } else {
                console.log(doc);
                res.json(doc);
            }
        }
    )
});

router.post(routes.response, async function (req, res) {
    console.log('response ersponserf asdrfasdf');
    console.log(req.body);
    const data = {
        title: req.body.title,
        content: req.body.content
    };
    stores.findOneAndUpdate(
        { link: req.body.link, reviews: { 'userId': req.body.userId } },
        { $set: { 'reviews.response': data } },
        function (e, doc) {
            if (e) {
                console.log('Error response: ' + e);
                res.json(e);
            } else {
                console.log('doc doc doc doc doc');
                console.log(doc);
                res.json(doc);
            }
        }
    );
    // stores.findOneAndUpdate(
    //     { link: req.body.link },
    //     { $set: { 'commends.$[el].response': data } },
    //     { arrayFilters: [{ 'el.userId': req.body.userId }] },
    //     function (e, doc) {
    //         if (e) {
    //             console.log('Error response: ' + e);
    //             res.json(e);
    //         } else {
    //             res.json(doc);
    //         }
    //     }
    // )
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

router.post(routes.reviews, async function (req, res) {
    console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
    console.log(req.body.link);
    const page = req.query.get || 0;
    const perPage = 20;
    stores.aggregate([
        { $match: { link: req.body.link } },
        { $unwind: '$reviews' },
        { $replaceRoot: { newRoot: '$reviews' } },
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
    })
});
export default router;