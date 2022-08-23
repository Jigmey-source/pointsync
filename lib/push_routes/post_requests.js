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

router.post(routes.checklike, async function (req, res) {
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
    try {
        deletePost(req.body.link);
        incrementposts(req.body.userId, -1);
        deleteinsnapshots(req.body.link);
        deleteinfeeds(req.body.link);
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
        function (e, doc) {
            if (e) {
                console.log('Error deleting post in Snapshots: ' + e);
            } else {
                console.log('Snap deleted in Snapshots');
            }
        }
    )
}

function deleteinfeeds(link) {
    feeds.updateMany(
        { 'snaps.link': link },
        { $pull: { 'snaps': { link: link } } },
        function (e, doc) {
            if (e) {
                console.log('Error deleting post in feeds: ' + e);
            } else {
                console.log('Post deleted from feeds');
            }
        }
    )
}

router.post(routes.addcomment, async function (req, res) {
    const comment = {
        comment: req.body.comment,
        userId: req.body.userId,
        link: req.body.link,
        name: req.body.name,
    }

    try {
        addcomment(req.body.link, comment);
        incrementcomments(req.body.link, 1);
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
        function (e, result) {
            if (e) {
                console.log('Error adding comment: ' + e);
            } else {
                console.log('New comment added');
            }
        }
    )
}

router.post(routes.deletecomment, async function (req, res) {
    try {
        deletecomment(req.body.userId, req.body.link);
        incrementcomments(req.body.link, -1);
        res.json('Successfully added comment');
    } catch (e) {
        res.json(e);
    }
});

function deletecomment(id, link) {
    post.findOne(
        { link: link },
        { $pull: { 'comments.userId': id } },
        function (e, doc) {
            if (e) {
                console.log('Error DeleteComment: ' + e);
            } else {
                console.log(doc);
            }
        }
    )
}

function incrementcomments(link, i) {
    post.updateOne(
        { link: link },
        { $inc: { 'totalcomments': i } },
        function (e, doc) {
            if (e) {
                console.log('Error incrementing posts: ' + e);
            } else {
                console.log('Posts incremented successfully');
            }
        }
    )
}

router.post(routes.addlike, async function (req, res) {
    console.log('like like like like liek liekliek ');
    console.log(req.body);

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
        (e, result) => {
            if (e) {
                console.log('Error adding new like: ' + e);
            } else {
                console.log('New like added');
            }
        }
    )
}

router.post(routes.undolike, async function (req, res) {
    console.log('inside undolikes asdfasdfasdfasdfasdf ');
    console.log(req.body);

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
        function (e, doc) {
            if (e) {
                console.log('Error undolikes: ' + e);
            } else {
                console.log(doc);
            }
        }
    )
}

function incrementlikes(link, i) {
    console.log('incrementing likes');
    console.log(link);
    post.updateOne(
        { link: link },
        { $inc: { 'likes': i } },
        function (e, doc) {
            if (e) {
                console.log('Error incrementing likes: ' + e);
            } else {
                console.log('Likes incremented successfully');
            }
        }
    )
}

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
        res.json('icon successfully added');
    } catch (e) {
        const response = { message: 'Error adding new post: ' + e }
        res.json(response);
    }
});

router.post(routes.snapshot, async function (req, res) {
    const newpost = new post(req.body);

    const snap = {
        name: newpost.name,
        link: newpost.link,
        description: newpost.description,
    };

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

    try {
        savesnapshot(req.body.userId, snap);
        incrementposts(req.body.userId, 1);
        publishtofeeds(req.body.userId, follower, snap);
        await newpost.save();
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

function publishtofeeds(id, follower, snap) {
    console.log('publishing feeds');
    console.log(id);
    console.log(snap);
    console.log(follower);
    const ids = follower.map(follower => follower.userId);
    console.log('id id id id id id id id id');
    console.log(ids);
    var myfollowers;
    ids.forEach(function (e) {
        console.log(e);
        myfollowers = e;
        // feeds.updateOne(
        //     { userId: e },
        //     { $push: { snaps: snap } },
        //     { upsert: true, new: true },
        // ).then(function () {
        //     console.log('published to feeds yeehaa ' + e);
        // }).catch(function (e) {
        //     console.log('what u think bitch! ' + e);
        // });
    });
    console.log(myfollowers);
    feeds.updateMany(
        { userId: myfollowers },
        { $push: { snaps: snap } },
        { upsert: true, new: true },
    ).then(function () {
        console.log('published to feeds yeehaa ' + myfollowers);
    }).catch(function (e) {
        console.log('what u think bitch! ' + e);
    });
}

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
    console.log('inside likes');
    console.log(req.body);
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

export default router;