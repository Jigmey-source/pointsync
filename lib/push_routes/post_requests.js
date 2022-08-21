import { Router } from 'express';
const router = Router();

import user from '../models/user.js';
import post from '../models/post.js';
import icons from '../models/icons.js';
import likes from '../models/likes.js';
import feeds from '../models/feeds.js';
import followers from '../models/followers.js';
import snapshots from '../models/snapshots.js';
import Route from '../const/route.js';

const routes = new Route();

router.post(routes.updatedescription, async function (req, res) {
    post.findOneAndUpdate(
        { link: req.body.link },
        { $set: { 'description': req.body.description } },
        function (e, doc) {
            if (e) {
                console.log('Post description: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
});

router.post(routes.checklike, async function (req, res) {
    // const pipeline = [
    //     { $match: { link: req.body.link, 'likes.userId': req.body.userId } },
    //     { $project: { 'likes.userId': req.body.userId } }
    // ]

    // const changeStream = likes.watch([
    //     { $match: { link: req.body.link, 'likes.userId': req.body.userId } },
    // ]);

    // likes.watch([
    //     { $match: { link: req.body.link, 'likes.userId': req.body.userId } },
    // ]).on('change', data => {
    //     console.log('ininininininininininininininin');
    //     console.log(data);
    //     res.json(data);
    // });

    // while (!changestream.isExhausted()) {
    //     if (changestream.hasNext()) {
    //         console.log('asdfasdfasdfasdfasdfasdfasdfasdfasdf');
    //         console.log(JSON.stringify(changestream.next()));
    //         res.json(likes);
    //     }
    // }

    // try {
    //     likes.watch([
    //         { $match: { link: req.body.link, 'likes.userId': req.body.userId } },
    //     ]).on('change', data => {
    //         console.log('yeeeehahahahahahahahahah');
    //         console.log(data);
    //         res.json(data);
    //     });
    // } catch (e) {
    //     console.log('ddddddddddddddddddddddddd');
    //     console.log(e);
    //     res.json(e);
    // }


    // changeStream.stream().pipe(
    //     new stream.Writable({
    //         objectMode: true,
    //         write: function (doc, _, cb) {
    //             console.log('yeeehahahahahahhaahahahh');
    //             console.log(doc);
    //             cb();
    //         }
    //     })
    // );

    // changeStream.on('change', async (change) => {
    //     // get meters reading log for respective platfrom and date
    //     try {
    //         console.log('yeehahahahahahahah');
    //         console.log(change);
    //         res.json(change);
    //     } catch (e) {
    //         console.log('ChangeStream: ' + e);
    //         res.json(e);
    //         // throw e;
    //     }
    // });

    likes.findOne(
        { link: req.body.link, 'likes.userId': req.body.userId },
        function (e, doc) {
            if (e) {
                console.log('Error CheckingLike: ' + e);
                res.json(e);
            } else {
                console.log('doc doc doc in chek check check check');
                console.log(doc);
                res.json(doc);
            }
        }
    )
});

router.post(routes.delete, async function (req, res) {
    post.updateOne(
        { link: req.body.link },
        { $pull: { 'link': req.body.link } },
        function (e, doc) {
            if (e) {
                console.log('Post Delete: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
});

router.post(routes.addcomment, async function (req, res) {
    const comment = {
        comment: req.body.comment,
        userId: req.body.userId,
        link: req.body.link,
        name: req.body.name,
    }

    try {
        const entry = await post.findOne({ link: req.body.link });
        entry.comments.push(comment);
        await entry.save();
        res.json(comment);
    } catch (e) {
        console.log('Error Addcomment: ' + e);
        res.json(e);
    }
});

router.post(routes.deletecomment, async function (req, res) {
    post.findOne(
        { link: req.body.link },
        { $pull: { 'comments.userId': req.body.userId } },
        function (e, doc) {
            if (e) {
                console.log('Error DeleteComment: ' + e);
                res.json(e)
            } else {
                console.log(doc);
                res.json(doc);
            }
        }
    )
});

router.post(routes.addlike, async function (req, res) {
    console.log('like like like like liek liekliek ');
    console.log(req.body);

    const data = {
        link: req.body.link,
        name: req.body.name,
        userId: req.body.userId,
    }

    try {
        const entry = await likes.findOne({ link: req.body.common });
        if (entry == null) {
            const entry = new likes({
                link: req.body.common,
                likes: data
            });
            await entry.save();
        } else {
            entry.likes.push(data);
            await entry.save();
        }
        res.json(entry);
    } catch (e) {
        console.log('Error addinglikes: ' + e);
        res.json(e);
    }
});

router.post(routes.undolike, async function (req, res) {
    console.log('inside undolikes asdfasdfasdfasdfasdf ');
    console.log(req.body);

    likes.updateOne(
        { link: req.body.link },
        { $pull: { 'likes': { userId: req.body.userId } } },
        function (e, doc) {
            if (e) {
                console.log('Error undolikes: ' + e);
                res.json(e);
            } else {
                console.log(doc);
                res.json(doc);
            }
        }
    )
});
router.post(routes.icon, async function (req, res) {
    const newpost = new post(req.body);

    const snap = {
        lat: newpost.lat,
        lng: newpost.lng,
        type: newpost.type,
        name: newpost.name,
        link: newpost.link,
        description: newpost.description,
    };

    console.log('icon icon icon icon');
    console.log(snap);
    console.log(req.body.userId);

    const follower = await followers.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$followers' },
        { $replaceRoot: { newRoot: '$followers' } }
    ], function (e, doc) {
        if (e) {
            console.log('fffffuck ' + e);
        } else {
            console.log('dock me ' + doc);
            return doc;
        }
    });

    console.log('fffffffffffffffffffffffffffffffffffffffffffffffffffffff');
    console.log(follower);

    try {
        savesnapshot(req.body.userId, snap);
        incrementposts(req.body.userId, 1);
        publishtofeeds(req.body.userId, follower, snap);
        saveicon(req.body.locality, req.body.adminArea, snap);
        await newpost.save();
        // const response = { message: 'Post Successfully added to' + req.body.name };
        res.json({ success: true });
    } catch (e) {
        const response = { message: 'Error adding new post: ' + e }
        res.json(response);
    }
});

function savesnapshot(id, snap) {
    console.log('in save snapshot ');
    console.log(id);
    console.log(snap);
    snapshots.findOneAndUpdate(
        { userId: id },
        { $push: { snaps: snap } },
        { upsert: true, new: true },
        (e, result) => {
            if (e) {
                console.log('Error adding new snapshot: ' + e);
            } else {
                console.log('New snapshot added');
            }
        }
    )
}

function incrementposts(id, i) {
    console.log('incrementing posts');
    console.log(id);
    user.updateOne(
        { userId: id },
        { $inc: { 'posts': i } },
        function (e, doc) {
            if (e) {
                console.log('Error incrementing posts: ' + e);
            } else {
                console.log('Posts incremented successfully');
            }
        }
    )
}

function publishtofeeds(id, follower, snap) {
    console.log('publishing feeds');
    console.log(id);
    console.log(snap);
    console.log(follower);
    const myfollowers = follower.map(follower => { return follower.userId; });
    console.log('id id id id id id id id id');
    console.log(doc.userId);
    console.log(myfollowers);
    console.log('ppppppppppppppppppppppppppppppppp');
    console.log(myfollowers.userId);
    feeds.insertMany([
        { userId: myfollowers.userId },
        { $push: { snaps: snap } },
        { upsert: true, new: true }
    ]).then(function () {
        console.log('published to feeds yeehaa');
    }).catch(function (e) {
        console.log('what u think bitch! ' + e);
    });
}

function saveicon(locality, adminArea, snap) {
    console.log('in save icon ');
    console.log(snap);
    icons.updateOne(
        { locality: locality, adminArea: adminArea },
        { $push: { snaps: snap } },
        { upsert: true, new: true },
        function (e, result) {
            if (e) {
                console.log('Error New icon: ' + e);
            } else {
                console.log('New icon added');
            }
        }
    );
}

router.post(routes.simplepost, async function (req, res) {
    const snap = new snapshots.snaps(req.body);
    try {
        const entry = await snapshots.findOne({ userId: req.body.userId });
        if (entry == null) {
            const entry = new snapshots({
                userId: req.body.userId,
                snaps: snap
            });
            await entry.save();
        } else {
            entry.posts.push(snap);
            await entry.save();
        }
        const response = { message: 'Post Successfully added to' + req.body.name };
        res.json(response);
    } catch (e) {
        const response = { message: 'Error adding new post: ' + e }
        res.json(response);
    }
});

router.post(routes.post, async function (req, res) {
    console.log('post post post post post post post post');
    console.log(req.body);
    post.findOne({ link: req.body.link }, function (e, doc) {
        if (e) {
            console.log('Error getting post: ' + e);
            res.json(e);
        } else {
            console.log(doc);
            res.json(doc);
        }
    })
});

router.post(routes.comments, async function (req, res) {
    console.log('inside comments');
    console.log(req.body);
    const page = req.query.get || 0;
    const perPage = 20;
    post.aggregate([
        { $match: { link: req.body.link } },
        { $unwind: '$comments' },
        { $replaceRoot: { newRoot: '$comments' } },
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
router.post(routes.likes, async function (req, res) {
    console.log('inside likes');
    console.log(req.body);
    const page = req.query.get || 0;
    const perPage = 20;
    likes.aggregate([
        { $match: { link: req.body.link } },
        { $unwind: '$likes' },
        { $replaceRoot: { newRoot: '$likes' } },
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
    })
});

export default router;