import { Router } from 'express';
const router = Router();

import Strings from '../const/strings.js';
import Cue from '../const/cue.js';
import Route from '../const/route.js';

import user from '../models/user.js';
import followers from '../models/followers.js';

const strings = new Strings();
const routes = new Route();
const cue = new Cue();

const perPage = 3;

router.post(routes.searched_user, async function (req, res) {
    const searcheduser = {
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        userId: req.body.userId,
    };
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(req.body);
    try {
        const entry = await user.findOne({ userId: req.body.id });
        entry.searched_users.push(searcheduser);
        await entry.save();
        res.json(req.body);
    } catch (e) {
        res.json(e);
    }
});
router.post(routes.follow, async function (req, res) {
    const following = {
        userId: req.body.userId,
        name: req.body.name,
        imageUrl: req.body.imageUrl,
    };

    try {
        const entry = await user.findOne({ userId: req.body.id });
        entry.following.push(following);
        console.log('inside following method');
        await entry.save();
        res.json(req.body);
    } catch (e) {
        console.log('Error uploading following: ' + e);
        res.json(e);
    }
});
router.post(routes.followee, async function (req, res) {
    // const follower = await user.findOne({ userId: req.body.userId });
    // const newfollower = new followers({
    //     userId: req.body.id,
    //     followers: req.body,
    // });
    // var increment = { $inc: { 'followers': 1 } };
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
        await user.findOneAndUpdate(
            { userId: req.body.id },
            { $inc: { 'followers': 1 } }, function (e, doc) {
                if (e) {
                    console.log('Error updating followers increment: ' + e);
                } else {
                    console.log('followers incremented successfully');
                }
            }
        );
        // await newfollower.save();
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});
router.post(routes.unfollow, async function (req, res) {
    try {
        console.log('lplplplplplplllplplplplplplplplplplplpl');
        console.log(req.body);
        // const entry = await user.findOne({ userId: req.body.userId });

        user.updateOne(
            { userId: req.body.userId },
            { $pull: { 'following': { userId: req.body.id } } },
            function (e, doc) {
                if (e) {
                    console.log('Error Unfollowing ' + e);
                } else {
                    console.log(doc);
                }
            }
        );
        followers.updateOne(
            { userId: req.body.id },
            { $pull: { 'followers': { userId: req.body.userId } } },
            function (e, doc) {
                if (e) {
                    console.log('Error Followers: ' + e);
                } else {
                    console.log(doc);
                }
            }
        );
        user.updateOne(
            { userId: req.body.id },
            { $inc: { 'followers': -1 } }, function (e, doc) {
                if (e) {
                    console.log('Error decrementing followers: ' + e);
                } else {
                    console.log('followers decremented successfully');
                }
            }
        );
        res.json(user);
    } catch (e) {
        res.json(e);
    }
});

router.post(routes.users, async function (req, res) {
    user.findOne({ userId: req.body.userId }, function (e, doc) {
        if (e) {
            res.json(e);
        } else {
            res.json(doc);
        }
    });
});

router.post(routes.searched_users, async function (req, res) {
    user.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$searched_users' },
        { $replaceRoot: { newRoot: '$searched_users' } },
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
    user.find({ searchKey: req.body.searchKey }, function (e, doc) {
        if (e) {
            res.json(e);
        } else {
            res.json(doc);
        }
    })
});
router.post(routes.addwork, async function (req, res) {
    try {
        const entry = await user.findOne({ userId: req.body.userId });
        entry.work.push(req.body);
        await entry.save();
        const response = { message: "Work added! " + req.body.title }
        res.json(response);
    } catch (e) {
        const response = { message: 'Error adding to work: ' + e };
        res.json(response);
    }
});

export default router;