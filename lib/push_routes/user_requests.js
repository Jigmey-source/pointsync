import { Router } from 'express';
const router = Router();

import Route from '../const/route.js';

import user from '../models/user.js';
import searchhistory from '../models/search_history.js';
import followers from '../models/followers.js';

const routes = new Route();

const perPage = 3;

router.post(routes.usertosearch, async function (req, res) {
    const searcheduser = {
        link: req.body.link,
        name: req.body.name,
        userId: req.body.userId,
    };
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(req.body);
    try {
        const entry = await searchhistory.findOne({ userId: req.body.id });
        if (entry == null) {
            const entry = new searchhistory({
                userId: req.body.id,
                users: searcheduser,
            });
            await entry.save();
        } else {
            entry.users.push(searcheduser);
            await entry.save();
        }
        res.json(req.body);
    } catch (e) {
        res.json(e);
    }
});

router.post(routes.placetosearch, async function (req, res) {
    const searchedplace = {
        locality: req.body.locality,
        adminArea: req.body.adminArea,
        country: req.body.country,
    };
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(req.body);
    try {
        const entry = await searchhistory.findOne({ userId: req.body.userId });
        if (entry == null) {
            const entry = new searchhistory({
                userId: req.body.userId,
                places: searchedplace,
            });
            await entry.save();
        } else {
            entry.places.push(searchedplace);
            await entry.save();
        }
        res.json(req.body);
    } catch (e) {
        res.json(e);
    }
});

router.post(routes.storetosearch, async function (req, res) {
    const searchedstore = {
        title: req.body.title,
        type: req.body.type,
    };
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(req.body);
    try {
        const entry = await searchhistory.findOne({ userId: req.body.id });
        if (entry == null) {
            const entry = new searchhistory({
                userId: req.body.id,
                stores: searchedstore,
            });
            await entry.save();
        } else {
            entry.stores.push(searchedstore);
            await entry.save();
        }
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
    )

    // try {
    //     const entry = await user.findOne({ userId: req.body.id });
    //     entry.following.push(data);
    //     console.log('inside following method');
    //     await entry.save();
    //     res.json(req.body);
    // } catch (e) {
    //     console.log('Error uploading following: ' + e);
    //     res.json(e);
    // }
});
router.post(routes.followee, async function (req, res) {
    try {
        const entry = await followers.findOne({ userId: req.body.id });
        if (entry == null) {
            const entry = new followers({
                userId: req.body.id,
                followers: req.body,
            });
            await entry.save();
        } else {
            entry.followers.push(req.body);
            await entry.save();
        }
        res.json('followee');
    } catch (e) {
        console.log(e);
        res.json(e);
    }

    await user.updateOne(
        { userId: req.body.id },
        { $inc: { 'totalfollowers': 1 } }, function (e, doc) {
            if (e) {
                console.log('Error updating followers increment: ' + e);
                res.json(e);
            } else {
                console.log('followers incremented successfully');
                res.json(doc);
            }
        }
    );
});
router.post(routes.unfollow, async function (req, res) {
    console.log('lplplplplplplllplplplplplplplplplplplpl');
    console.log(req.body);

    user.updateOne(
        { userId: req.body.userId },
        { $pull: { 'following': { userId: req.body.id } } },
        function (e, doc) {
            if (e) {
                console.log('Error Unfollowing ' + e);
                res.json(e);
            } else {
                console.log(doc);
                res.json(doc);
            }
        }
    );
    followers.updateOne(
        { userId: req.body.id },
        { $pull: { 'followers': { userId: req.body.userId } } },
        function (e, doc) {
            if (e) {
                console.log('Error Followers: ' + e);
                res.json(e);
            } else {
                console.log(doc);
                res.json(doc);
            }
        }
    );
    user.updateOne(
        { userId: req.body.id },
        { $inc: { 'totalfollowers': -1 } },
        function (e, doc) {
            if (e) {
                console.log('Error decrementing followers: ' + e);
                res.json(e);
            } else {
                console.log('followers decremented successfully');
                res.json(doc);
            }
        }
    );
});

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
    res.json(req.body);
});

router.post(routes.users, async function (req, res) {
    user.findOne({ userId: req.body.userId }, function (e, doc) {
        if (e) {
            console.log('Error getting User: ' + e);
            res.json(e);
        } else {
            res.json(doc);
        }
    });
});

router.post(routes.searched_users, async function (req, res) {
    searchhistory.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$users' },
        { $replaceRoot: { newRoot: '$users' } },
        { $sort: { 'time_stamp': -1 } }
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
    // user.find(
    //     { searchKey: req.body.searchKey },
    //     function (e, doc) {
    //         if (e) {
    //             res.json(e);
    //         } else {
    //             res.json(doc);
    //         }
    //     });
});
router.post(routes.addwork, async function (req, res) {
    const data = {
        title: req.body.title,
        type: req.body.type,
        link: req.body.link,
        locality: req.body.locality,
        adminArea: req.body.adminArea,
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
    console.log('inside following peopple');
    console.log(req.body);
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

export default router;