import { Router } from 'express';
const router = Router();

import Strings from '../const/strings.js';
import Cue from '../const/cue.js';
import Route from '../const/route.js';

import comments from '../models/comments.js';
import feeds from '../models/feeds.js';
import followers from '../models/followers.js';
import following from '../models/following.js';
import likes from '../models/likes.js';
import notifications from '../models/notifications.js';
import notify from '../models/notify.js';
import searched_user from '../models/searched_user.js';
import records from '../models/records.js';
import reviews from '../models/reviews.js';
import user from '../models/user.js';
import post from '../models/posts.js';

const strings = new Strings();
const routes = new Route();
const cue = new Cue();

const perPage = 3;

router.post(routes.signUp, async function (req, res) {
    const muser = new user({
        group: req.body.group,
        placemarker: req.body.placemarker,
        name: req.body.name,
        searchKey: req.body.searchKey,
        token: req.body.token,
        userId: req.body.userId,
    });
    await muser.save();

    try {
        await muser.save();
        console.log("New User has been created");
    } catch (e) {
        console.log('ERROR: creating new user ' + e);
    }
});

router.post(routes.addToSearch, async function (req, res) {
    const searcheduser = new searched_user({
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        userId: req.body.userId,
    });
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(req.body);
    try {
        const entry = await user.findOne({ userId: req.body.id });
        entry.searched_users.push(searcheduser);
        await entry.save();
    } catch (e) {
        console.log(e);
    }
});
router.post(routes.followUser, async function (req, res) {
    const mfollowing = new following({
        userId: req.body.userId,
        name: req.body.name,
        imageUrl: req.body.imageUrl,
    });
    try {
        const entry = await user.findOne({ userId: req.body.id });
        entry.following.push(mfollowing);
        await entry.save();
    } catch (e) {
        console.log(e);
    }
});

router.post(routes.followee, async function (req, res) {
    const follower = await user.findOne({ userId: req.body.userId });
    const newfollower = new followers({
        userId: req.body.userId,
        followers: req.body,
    });
    var increment = { $inc: { 'followers': 1 } };
    try {
        await user.findOneAndUpdate(follower, increment);
        await newfollower.save();
    } catch (e) {
        console.log(e);
    }
});

router.post(routes.notifications, async function (req, res) {
    const notification = new notifications({
        userId: req.body.userId,
        notifications: req.body,
    });
    try {
        // const entry = await notify.find({ userId: req.body.userId });
        // entry.notifications.push(req.body);
        await notification.save();
    } catch (e) {
        console.log(e);
    }
});

router.post(routes.unFollowUser, async function (req, res) {
    try {
        console.log('lplplplplplplllplplplplplplplplplplplpl');
        console.log(req.body);
        // const entry = await user.findOne({ userId: req.body.userId });

        user.updateOne(
            { userId: req.body.userId },
            { $pull: { 'following': { userId: req.body.id } } }
        );
    } catch (e) {
        console.log(e);
    }
});
router.post(routes.comments, async function (req, res) {
    comments.find({ userId: req.body.userId }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log('comments eeeeeeeeeeeeeeeeeeeeeeeee');
            res.json(doc);
        }
    });
});
router.post(routes.feeds, async function (req, res) {
    const page = req.query.get || 0;
    const perPage = 20;
    feeds.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$feeds' },
        { $sort: { timeStamp: -1 } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (error, doc) {
        if (error) {
            return (res.send(500, error));
        } else {
            res.json(doc);
        }
    });
});
router.post(routes.followers, async function (req, res) {
    followers.find({ userId: req.body.userId }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log('followers eeeeeeeeeeeeeeeeeeeeeeeee');
            res.json(doc);
        }
    });
});
router.post(routes.likes, async function (req, res) {
    likes.find({ userId: req.body.userId }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log('likes eeeeeeeeeeeeeeeeeeeeeeeee');
            res.json(doc);
        }
    });
});
router.post(routes.notifications, async function (req, res) {
    notifications.find({ userId: req.body.userId }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log('notifications eeeeeeeeeeeeeeeeeeeeeeeee');
            res.json(doc);
        }
    });
});

router.post(routes.posts, async function (req, res) {
    post.find({ userId: req.body.userId }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log('posts eeeeeeeeeeeeeeeeeeeeeeeee');
            res.json(doc);
        }
    });
});

router.post(routes.records, async function (req, res) {
    records.find({ userId: req.body.userId }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log('records eeeeeeeeeeeeeeeeeeeeeeeee');
            res.json(doc);
        }
    });
});

router.post(routes.reviews, async function (req, res) {
    reviews.find({ userId: req.body.userId }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log('reviews eeeeeeeeeeeeeeeeeeeeeeeee');
            res.json(doc);
        }
    });
});

router.post(routes.users, async function (req, res) {
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

router.post(routes.searched_users, async function (req, res) {
    // user.findOne({ userId: req.body.userId }).elemMatch('searched_users').limit(perPage)
    console.log('hhhhhhhhhhhhheeeeeeeeeeeeeeelllllllllllooooooooooooooooooooooo');
    user.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$searched_users' },
        { $replaceRoot: { newRoot: '$searched_users' } },
        { $sort: { 'time_stamp': -1 } }
    ], function (err, doc) {
        if (err) {
            console.log('pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp');
            console.log(req.body.userId);
            console.log(err);
        } else {
            console.log('ooooooooooookkkkkkkkkkkkkk');
            console.log(doc);
            res.json(doc);
        }
    });
});

router.post(routes.search_users, async function (req, res) {
    user.find({ searchKey: req.body.searchKey }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            res.json(doc);
        }
    })
});

router.post(routes.simplepost, async function (req, res) {
    // const newpost = new post({
    //     userId: req.body.userId,
    //     posts: req.body,
    // });
    try {
        const entry = await post.findOne({ userId: req.body.id });
        entry.posts.push(req.body);
        await entry.save();
        // await post.updateOne(
        //     { userId: req.body.userId },
        //     { $set: { 'posts': req.body } },
        //     { $upsert: true }
        // );
    } catch (e) {
        console.log(e);
    }
});

export default router;
