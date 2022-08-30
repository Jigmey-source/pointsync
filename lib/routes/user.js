import { Router } from 'express';
const router = Router();
import admin from 'firebase-admin';

import Route from '../const/route.js';

import user from '../models/user.js';
import followers from '../models/followers.js';
import searchhistory from '../models/search_history.js';

const routes = new Route();

router.post(routes.get, async function (req, res) {
    user.findOne(
        { userId: req.body.userId },
        function (e, doc) {
            if (e) {
                console.log('Error getting User: ' + e);
                res.json(e);
            } else {
                console.log('doc docdc dcodocodc: ' + doc);
                res.json(doc);
            }
        });
});

router.post(routes.follow, async function (req, res) {
    const data = {
        userId: req.body.userId,
        name: req.body.name,
        link: req.body.link,
    };

    user.updateOne(
        { userId: req.body.id },
        { $set: { 'following': data }, $inc: { 'totalfollowing': 1 } },
        function (e, doc) {
            if (e) {
                console.log('Error following :' + e);
                res.json(e);
            } else {
                console.log('Following Updated: ' + doc);
                res.json(doc);
            }
        }
    );
});

router.post(routes.followee, async function (req, res) {
    try {
        addfollowers(req);
        incrementfollowers(req.body.id, 1);
        res.json({ success: true });
    } catch (e) {
        console.log('Error adding new follower: ' + e);
        res.json(e);
    }
});

function addfollowers(req) {
    followers.updateOne(
        { userId: req.body.id },
        { $push: { followers: req.body } },
        { upsert: true, new: true },
    ).catch(function (e) {
        console.log('Error adding follower: ' + e);
    });
}

router.post(routes.unfollow, async function (req, res) {
    try {
        pullfollowing(req.body.id, req.body.userId);
        newfollowers(req.body.id, req.body.userId);
        incrementfollowing(req.body.userId, -1);
        incrementfollowers(req.body.id, -1);
        resjson({ success: true });
    } catch (e) {
        res.json(e);
    }
});

function pullfollowing(id, userId) {
    user.updateOne(
        { userId: userId },
        { $pull: { 'following': { userId: id } } },
    ).catch(function (e) {
        console.log('Error Unfollowing ' + e);
    });
}

function incrementfollowers(id, i) {
    user.updateOne(
        { userId: id },
        { $inc: { 'totalfollowers': i } },
    ).catch(function (e) {
        console.log('Error updating followers increment: ' + e);
    });
}

function incrementfollowing(id, i) {
    user.updateOne(
        { userId: id },
        { $inc: { 'totalfollowing': i } },
    ).catch(function (e) {
        console.log('Error updating totalfollowing increment: ' + e);
    });
}

function newfollowers(id, userId) {
    followers.updateOne(
        { userId: id },
        { $pull: { 'followers': { userId: userId } } },
    ).catch(function (e) {
        console.log('Error Followers: ' + e);
    });
}

router.post(routes.enablelocation, async function (req, res) {
    const data = {
        online: true,
        country: req.body.country,
        locality: req.body.locality,
        adminArea: req.body.adminArea,
        lat: req.body.lat,
        lng: req.body.lng,
    };

    console.log(req.body);

    user.updateOne(
        { userId: req.body.userId },
        { $set: { placemarker: data } },
        function (e, doc) {
            if (e) {
                console.log('Error enabling location: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
});

router.post(routes.disablelocation, async function (req, res) {
    user.updateOne(
        { userId: req.body.userId },
        { $set: { 'placemarker.online': false } },
        function (e, doc) {
            if (e) {
                console.log('Error disabling location: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
});

router.post(routes.addwork, async function (req, res) {
    const data = {
        title: req.body.title,
        type: req.body.type,
        link: req.body.link,
    };

    try {
        const entry = await user.findOne({ userId: req.body.userId });
        entry.work.push(data);
        await entry.save();
        const response = { message: "Work added! " + req.body.title }
        res.json(response);
    } catch (e) {
        const response = { message: 'Error adding to work: ' + e };
        res.json(response);
    }
});

router.post(routes.following, async function (req, res) {
    const page = req.query.get || 0;
    const perPage = 20;
    user.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$following' },
        { $replaceRoot: { newRoot: '$following' } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            console.log('Error getting following: ' + e);
            res.send(500, e);
        } else {
            console.log(doc);
            res.json(doc);
        }
    })
});

router.post(routes.followers, async function (req, res) {
    console.log('inside following peopple');
    console.log(req.body);
    const page = req.query.get || 0;
    const perPage = 20;
    followers.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$followers' },
        { $replaceRoot: { newRoot: '$followers' } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            console.log('Error getting following: ' + e);
            res.send(500, e);
        } else {
            console.log(doc);
            res.json(doc);
        }
    })
});

router.post(routes.block, async function (req, res) {
    try {
        blockuser(req.body.id, req.body.userId);
        removesearchhistory(req.body.id, req.body.userId);
        pullfollowing(req.body.id, req.body.userId);
        newfollowers(req.body.id, req.body.userId);
        newfollowers(req.body.userId, req.body.id);
        res.json('successfully blocked');
    } catch (e) {
        res.json(e);
    }
});

function blockuser(id, userId) {
    user.updateOne(
        { userId: userId },
        { $push: { blocked: id } },
    ).catch(function (e) {
        console.log('Error blocking user: ' + id);
    });
}

function removesearchhistory(id, userId) {
    searchhistory.updateOne(
        { userId: id },
        { $pull: { 'users': { userId: userId } } },
    ).catch(function (e) {
        console.log('Error removing from search history: ' + e);
    })
}

router.post(routes.unblock, async function (req, res) {
    user.updateOne(
        { userId: req.body.userId },
        { $pull: { blocked: req.body.id } },
        function (e, doc) {
            if (e) {
                console.log('Error unblocking user: ' + req.body.id);
                res.json(e);
            } else {
                console.log('Successfully unblocked user: ' + req.body.id);
                res.json(doc);
            }
        }
    );
});

router.post(routes.hidefrom, async function (req, res) {
    user.find({
        userId: req.body.userId
    }).distinct('hidefrom', function (e, doc) {
        if (e) {
            console.log('Error getting hidefrom: ' + e);
            res.json(e);
        } else {
            console.log('hidefrom doc: ' + doc);
            res.json(doc);
        }
    });
});

router.post(routes.hide, async function (req, res) {
    user.updateOne(
        { userId: req.body.userId },
        { $push: { hidefrom: req.body.group } },
        function (e, doc) {
            if (e) {
                console.log('Error hiding :' + req.body.group);
                res.json(e);
            } else {
                console.log('Successfully hidden from: ' + req.body.group);
                res.json(doc);
            }
        }
    );
});

router.post(routes.display, async function (req, res) {
    user.updateOne(
        { userId: req.body.userId },
        { $pull: { hidefrom: req.body.group } },
        function (e, doc) {
            if (e) {
                console.log('Error hiding group: ' + req.body.group);
                res.json(e);
            } else {
                console.log('Successfully hidden group: ' + req.body.group);
                res.json(doc);
            }
        }
    );
});

export default router;