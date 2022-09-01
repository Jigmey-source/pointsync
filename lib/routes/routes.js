import { Router } from 'express';
const router = Router();

import Route from '../const/route.js';

import user from '../models/user.js';
import reports from '../models/reports.js';
import notifications from '../models/notifications.js';
import feeds from '../models/feeds.js';

const routes = new Route();

const perPage = 3;

router.post(routes.signUp, async function (req, res) {
    const muser = new user({
        group: req.body.group,
        placemarker: req.body.placemarker,
        name: req.body.name,
        token: req.body.token,
        userId: req.body.userId,
    });

    try {
        await muser.save();
        const response = { message: "New User has been created" };
        res.json(response);
    } catch (e) {
        console.log('ERROR: creating new user ' + e);
        res.json(e);
    }
});

router.post(routes.savetoken, async function (req, res) {
    user.updateOne(
        { userId: req.body.userId },
        { $set: { token: req.body.token } },
        function (e, doc) {
            if (e) {
                console.log('Error saving token: ' + e);
                res.json(e);
            } else {
                console.log('token successfully saved');
                res.json(doc);
            }
        }
    )
});

router.post(routes.alter, async function (req, res) {
    const data = {
        online: false,
        locality: req.body.locality,
        adminArea: req.body.adminArea,
        country: req.body.country,
        lat: req.body.lat,
        lng: req.body.lng,
    }
    user.updateOne(
        { userId: req.body.userId },
        { $set: { token: req.body.token, placemarker: data } },
        function (e, doc) {
            if (e) {
                console.log('Error altering user: ' + e);
                res.json(e);
            } else {
                console.log('User altered successfully');
                res.json(doc);
            }
        }
    )
});

router.post(routes.relocated, async function (req, res) {
    const data = {
        online: false,
        country: req.body.country,
        locality: req.body.locality,
        adminArea: req.body.adminArea,
        lat: req.body.lat,
        lng: req.body.lng,
    }

    user.updateOne(
        { userId: req.body.userId },
        { $set: { placemarker: data } },
        function (e, doc) {
            if (e) {
                console.log('Error relocating user: ' + e);
                res.json(e);
            } else {
                console.log('User relocated successfully');
                res.json(doc);
            }
        }
    )
})

router.post(routes.reports, async function (req, res) {
    const report = new reports(req.body);
    try {
        await report.save();
        // addreport(req);
        deleteinfeeds(req.body.id, req.body.link);
        res.json('SUCCESS');
    } catch (e) {
        console.log('Error Reports: ' + e);
        res.json(e);
    }
});

// function addreport(req) {
//     reports.updateOne(
//         { $push: { reports: req.body } },
//         { upsert: true, new: true },
//     ).then(function (doc) {
//         console.log('REPORTS BODY: ' + req.body);
//     }).catch(function (e) {
//         console.log('ERROR ADDING REPORTS: ' + e);
//     });
// };

function deleteinfeeds(id, link) {
    feeds.updateOne(
        { userId: id },
        { $pull: { 'feeds': { link: link} } },
    ).then(function (doc) {
        console.log('FEEDS HAVE BEEN UPDATED');
    }).catch(function (e) {
        console.log('ERROR UPDATING IN FEEDS: ' + e);
    });
    // feeds.deleteOne({
    //     link: link
    // }).then(function () {
    //     console.log('FEEDS HAVE BEEN UPDATED');
    // }).catch(function (e) {
    //     console.log('ERROR UPDATING IN FEEDS: ' + e);
    // });
};

router.post(routes.locationupdate, async function (req, res) {
    user.findOne(
        { userId: req.body.userId },
        function (e, doc) {
            if (e) {
                console.log('ERROR GETTING PLACEMARKER: ' + e);
                res.json(e);
            } else {
                console.log('PLACEMARKER: ' + doc);
                res.json(doc['placemarker']);
            }
        }).select('placemarker -_id');
});

router.post(routes.checknotification, async function (req, res) {
    notifications.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$notifications' },
        { $replaceRoot: { newRoot: '$notifications' } },
        { $match: { seen: false } },
        { $limit: 1 },
    ], function (e, doc) {
        if (e) {
            console.log('ERROR CHECKING NOTIFICATION: ' + e);
            res.json(e);
        } else {
            console.log('NOTIFICATIONS: ' + doc);
            res.json(doc);
        }
    });
});

router.post(routes.getreports, async function (req, res) {
    reports.aggregate([
        { $unwind: '$reports' },
        { $replaceRoot: { newRoot: '$reports' } },
        { $sort: { 'timestamp': -1 } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ]).then(function (doc) {
        res.json(doc);
    }).catch(function (e) {
        res.json('ERROR GETTING REPORTS: ' + e);
    });
});

export default router;
