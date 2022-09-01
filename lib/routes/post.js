import { Router } from 'express';
const router = Router();
import mongoose from 'mongoose';

import user from '../models/user.js';
import post from '../models/post.js';
import icons from '../models/icons.js';
import likes from '../models/likes.js';
import feeds from '../models/feeds.js';
import followers from '../models/followers.js';
import snapshots from '../models/snapshots.js';
import Route from '../const/route.js';

const routes = new Route();

router.post(routes.checklike, async function (req, res) {
    const client = mongoose.connection.client;
    const db = client.db('Pointsync');
    const likes = db.collection('likes');
    // const changeStream = collection.watch();
    // changeStream.on('change', next => {

    // });
    const changeStream = await likes.watch([
        { $match: { link: req.body.link } },
        { $unwind: '$likes' },
        { $replaceRoot: { newRoot: '$likes' } },
    ]).on('change', doc => {
        try {
            console.log('ONCHANGE TRY BLOCK OBJECT');
            console.log(doc);
            res.json(doc);
        } catch (e) {
            console.log('WHAT IS THE FREAKING ERROR: ' + e);
            res.json(e);
        }
    });
    // changeStream.close();
    await closeChangeStream(20000, changeStream);
    res.json('listening');
    // likes.findOne(
    //     { link: req.body.link, 'likes.userId': req.body.userId },
    //     function (e, doc) {
    //         if (e) {
    //             console.log('Error CheckingLike: ' + e);
    //             res.json(e);
    //         } else {
    //             console.log('Inside CheckLike: ' + doc);
    //             res.json(doc);
    //         }
    //     }
    // )
});

function closeChangeStream(timeInMs = 60000, changeStream) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Closing the change stream");
            changeStream.close();
            resolve();
        }, timeInMs)
    })
};


router.post(routes.get, async function (req, res) {
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

router.post(routes.snapshots, async function (req, res) {
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
});

router.post(routes.landmarks, async function (req, res) {
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
});

router.post(routes.feeds, async function (req, res) {
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
});

router.post(routes.markers, async function (req, res) {
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
});

router.post(routes.comments, async function (req, res) {
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
    })
});

router.post(routes.likes, async function (req, res) {
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
    })
});

router.post(routes.addcomment, async function (req, res) {
    const comment = {
        comment: req.body.comment,
        userId: req.body.userId,
        link: req.body.link,
        name: req.body.name,
    }

    try {
        addcomment(req.body.common, comment);
        incrementcomments(req.body.common, 1);
        res.json(comment);
    } catch (e) {
        console.log('Error Addcomment: ' + e);
        res.json(e);
    }
});

function addcomment(link, comment) {
    post.updateOne(
        { link: link },
        { $push: { comments: comment } },
        { upsert: true, new: true },
    ).catch(function (e) {
        console.log('Error adding comment: ' + e);
    })
}

router.post(routes.deletecomment, async function (req, res) {
    try {
        deletecomment(req.body.userId, req.body.link, req.body.comment);
        incrementcomments(req.body.link, -1);
        res.json('Successfully added comment');
    } catch (e) {
        res.json(e);
    }
});

function deletecomment(id, link, comment) {
    post.updateOne(
        { link: link },
        { $pull: { 'comments': { userId: id, comment: comment } } },
    ).catch(function (e) {
        console.log('Error DeleteComment: ' + e);
    })
}

function incrementcomments(link, i) {
    post.updateOne(
        { link: link },
        { $inc: { 'totalcomments': i } },
    ).catch(function (e) {
        console.log('Error incrementing posts: ' + e);
    })
}

router.post(routes.addlike, async function (req, res) {
    const data = {
        link: req.body.link,
        name: req.body.name,
        userId: req.body.userId,
    }

    try {
        addlike(req.body.common, data);
        incrementlikes(req.body.common, 1);
        res.json('Successfully added like');
    } catch (e) {
        res.json(e);
    }
});

function addlike(link, data) {
    likes.findOneAndUpdate(
        { link: link },
        { $push: { likes: data } },
        { upsert: true, new: true },
    ).catch(function (e) {
        console.log('Error adding new like: ' + e);
    })
}

router.post(routes.undolike, async function (req, res) {
    try {
        undolike(req.body.userId, req.body.link);
        incrementlikes(req.body.link, -1);
        res.json('Successfully added likes');
    } catch (e) {
        res.json(e);
    }
});

function undolike(id, link) {
    likes.updateOne(
        { link: link },
        { $pull: { 'likes': { userId: id } } },
    ).catch(function (e) {
        console.log('Error undolikes: ' + e);
    })
}

function incrementlikes(link, i) {
    post.updateOne(
        { link: link },
        { $inc: { 'likes': i } },
    ).catch(function (e) {
        console.log('Error incrementing likes: ' + e);
    });
}

router.post(routes.icon, async function (req, res) {
    const newpost = new post(req.body);

    const data = {
        lat: newpost.lat,
        lng: newpost.lng,
        type: newpost.type,
        name: newpost.name,
        link: newpost.link,
        userId: newpost.userId,
        description: newpost.description,
    };

    try {
        savesnapshot(req.body.userId, data);
        incrementposts(req.body.userId, 1);
        const follower = await myfollowers(req.body.userId);
        console.log('FOLLOWER FOLLOWER FOLLOWER FOLLOWER: ' + follower);
        publishtofeeds(req.body.userId, follower, data);
        saveicon(req.body.locality, req.body.adminArea, data);
        await newpost.save();
        res.json('icon successfully added');
    } catch (e) {
        const response = { message: 'Error adding new post: ' + e }
        res.json(response);
    }
});

router.post(routes.snapshot, async function (req, res) {
    console.log('INSIDE SNAPSHOT METHOD');
    const newpost = new post(req.body);

    const data = {
        name: newpost.name,
        link: newpost.link,
        userId: newpost.userId,
        description: newpost.description,
    };

    try {
        savesnapshot(req.body.userId, data);
        incrementposts(req.body.userId, 1);
        const follower = await myfollowers(req.body.userId);
        console.log('FOLLOWER FOLLOWER FOLLOWER FOLLOWER: ' + follower);
        publishtofeeds(req.body.userId, follower, data);
        await newpost.save();
        res.json({ success: true });
    } catch (e) {
        const response = { message: 'Error adding new post: ' + e }
        res.json(response);
    }
});

async function myfollowers(id) {
    console.log('INSIDE MYFOLLOWERS METHOD');
    console.log(id);
    const follower = await followers.aggregate([
        { $match: { userId: id } },
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
    return follower;
}

router.post(routes.delete, async function (req, res) {
    try {
        deletePost(req.body.link);
        incrementposts(req.body.userId, -1);
        deleteinsnapshots(req.body.link);
        deleteinfeeds(req.body.link);
        deleteinicons(req.body.link);
        res.json('Successfully deleted Post');
    } catch (e) {
        console.log('Error deleting post: ' + e);
        res.json(e);
    }
});

function deletePost(link) {
    post.deleteOne({
        link: link
    }).then(function () {
        console.log('Post has been deleted');
    }).catch(function (e) {
        console.log('Error deleting post: ' + e);
    });
}

function deleteinsnapshots(link) {
    snapshots.updateOne(
        { 'snaps.link': link },
        { $pull: { 'snaps': { link: link } } },
    ).catch(function (e) {
        console.log('Error deleting post in Snapshots: ' + e);
    })
}

function deleteinfeeds(link) {
    feeds.updateMany(
        { 'feeds.link': link },
        { $pull: { 'feeds': { link: link } } },
    ).catch(function (e) {
        console.log('Error deleting post in feeds: ' + e);
    })
}

function deleteinicons(link) {
    icons.updateOne(
        { 'icons.link': link },
        { $pull: { 'icons': { link: link } } },
    ).catch(function (e) {
        console.log('Error deleting in Icons: ' + e);
    })
}

function savesnapshot(id, data) {
    snapshots.findOneAndUpdate(
        { userId: id },
        { $push: { snaps: data } },
        { upsert: true, new: true },
    ).catch(function (e) {
        console.log('Error adding new snapshot: ' + e);
    })
}

function incrementposts(id, i) {
    user.updateOne(
        { userId: id },
        { $inc: { 'posts': i } },
    ).catch(function (e) {
        console.log('Error incrementing posts: ' + e);
    })
}

function saveicon(locality, adminArea, data) {
    icons.updateOne(
        { locality: locality, adminArea: adminArea },
        { $push: { icons: data } },
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

function publishtofeeds(id, follower, data) {
    const ids = follower.map(follower => follower.userId);
    ids.forEach(function (e) {
        console.log(e);
        feeds.updateMany(
            { userId: e },
            { $push: { feeds: data } },
            { upsert: true, new: true },
        ).then(function () {
            console.log('published to feeds yeehaa ' + e);
        }).catch(function (e) {
            console.log('what u think bitch! ' + e);
        });
    });
}

router.post(routes.post, async function (req, res) {
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

export default router;