import { Router } from 'express';
const router = Router();

import stores from '../models/store.js';
import catalogues from '../models/catalogues.js';
import records from '../models/records.js';
import Route from '../const/route.js';

const routes = new Route();

router.post(routes.get, async function (req, res) {
    stores.findOne({ link: req.body.link }, function (e, doc) {
        if (e) {
            console.log('Error getting Store: ' + e);
            res.json(e);
        } else {
            console.log('STORE GET: ' + doc);
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
        addrecommendation(req.body.common, data);
        incrementrecommendationsinstore(req.body.common, 1);
        incrementrecommendationsinrecord(req.body.common, 1);
        res.json('Recommendation added');
    } catch (e) {
        console.log('Error recommending: ' + e);
        res.json(e);
    }
});

function addrecommendation(link, data) {
    stores.updateOne(
        { link: link },
        { $push: { commends: data } },
    ).catch(function (e) {
        console.log('Error adding recommendation: ' + e);
    });
}

router.post(routes.decrement, async function (req, res) {
    console.log('opopopopopopopopopopopopopopopopo');
    console.log(req.body);

    try {
        deleterecommendation(req.body.userId, req.body.link);
        incrementrecommendationsinstore(req.body.link, -1);
        incrementrecommendationsinrecord(req.body.link, -1);
        res.json('Successfully decremented');
    } catch (e) {
        console.log('Error decrementing: ' + e);
        res.json(e);
    }
});

function deleterecommendation(id, link) {
    stores.updateOne(
        { link: link },
        { $pull: { 'commends': { userId: id } } },
    ).catch(function (e) {
        console.log('Error decrementing: ' + e);
    });
}

function incrementrecommendationsinstore(link, i) {
    stores.updateOne(
        { link: link },
        { $inc: { 'recommendations': i } },
    ).catch(function (e) {
        console.log('Error incrementing recommendations in store: ' + e);
    })
}

function incrementrecommendationsinrecord(link, i) {
    records.updateOne(
        { 'records.link': link },
        { $inc: { 'records.$[el].recommendations': i } },
        { arrayFilters: [{ 'el.link': link }] },
    ).catch(function (e) {
        console.log('Error incrementing recommendations in record: ' + e);
    });
}

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
        await addreview(req.body.common, review);
        const rate = await calculateaveragerate(req.body.common);
        incrementreviewinstore(req.body.common, rate, 1);
        setrateinrecord(req.body.common, rate);
        res.json(review);
    } catch (e) {
        console.log('Error addingreview: ' + e);
        res.json(e);
    }
});

async function addreview(link, review) {
    await stores.updateOne(
        { link: link },
        { $push: { reviews: review } },
    )
}

router.post(routes.deletereview, async function (req, res) {
    console.log('deleting review mnadyusfasidfhjas');
    console.log(req.body);

    try {
        await deletereview(req.body.userId, req.body.link);
        const rate = await calculateaveragerate(req.body.link);
        incrementreviewinstore(req.body.link, rate, -1);
        setrateinrecord(req.body.link, rate);
        res.json('successfully deleted reviews');
    } catch (e) {
        res.json(e);
    }
});

async function deletereview(id, link) {
    await stores.findOneAndUpdate(
        { link: link },
        { $pull: { 'reviews': { userId: id } } }
    )
}

async function calculateaveragerate(common) {
    var rate;
    const doc = await stores.aggregate([
        { $match: { link: common } },
        { $unwind: '$reviews' },
        { $replaceRoot: { newRoot: '$reviews' } },
        { $group: { _id: null, averagerate: { $avg: '$rate' } } }
    ], function (e, doc) {
        if (e) {
            console.log('Error having average ' + e);
        } else {
            return doc;
        }
    });
    doc.forEach(function (s) { rate = s['averagerate']; })
    return rate;
}

function incrementreviewinstore(link, rate, i) {
    console.log('show me the money: ' + rate);
    stores.updateOne(
        { link: link },
        { $set: { 'averagerate': rate, $inc: { 'totalreviews': i } } },
    ).catch(function (e) {
        console.log('Error incrementing reviews in store: ' + e);
    });
}

function setrateinrecord(link, rate) {
    console.log('show me the dollar: ' + rate);
    records.updateOne(
        { 'records.link': link },
        { $set: { 'records.$[el].averagerate': rate } },
        { arrayFilters: [{ 'el.link': link }] },
    ).catch(function (e) {
        console.log('Error incrementing reviews in record: ' + e);
    })
}

router.post(routes.checkstar, async function (req, res) {
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
    )
});

router.post(routes.response, async function (req, res) {
    const data = {
        title: req.body.title,
        content: req.body.content
    };
    stores.updateOne(
        { link: req.body.link, 'reviews.userId': req.body.userId },
        { $set: { 'reviews.$.response': data } },
        function (e, doc) {
            if (e) {
                console.log('Error response: ' + e);
                res.json(e);
            } else {
                console.log('doc doc doc doc doc');
                console.log(doc);
                res.json(doc);
            }
        },
    );
});

router.post(routes.catalogue, async function (req, res) {
    const page = req.query.get || 0;
    const perPage = 20;
    catalogues.aggregate([
        { $match: { link: req.body.link } },
        { $unwind: '$catalogue' },
        { $replaceRoot: { newRoot: '$catalogue' } },
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

router.post(routes.commends, async function (req, res) {
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(req.body.link);
    stores.aggregate([
        { $match: { link: req.body.link } },
        { $unwind: '$commends' },
        { $replaceRoot: { newRoot: '$commends' } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            console.log('Error getting commends: ' + e);
            res.send(e);
        } else {
            console.log(doc);
            res.json('Successfully received commends');
        }
    })
});

export default router;