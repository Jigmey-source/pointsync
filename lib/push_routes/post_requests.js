import { Router } from 'express';
const router = Router();

import post from '../models/post.js';
import posts from '../models/posts.js';
import likes from '../models/likes.js';
import snapshots from '../models/snapshots.js';
import Route from '../const/route.js';

const routes = new Route();

router.post(routes.updatedescription, async function (req, res) {
    post.findOneAndUpdate(
        { imageUrl: req.body.imageUrl },
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

router.post(routes.delete, async function (req, res) {
    post.updateOne(
        { imageUrl: req.body.imageUrl },
        { $pull: { 'imageUrl': req.body.imageUrl } },
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
        imageUrl: req.body.imageUrl,
        name: req.body.name,
    }

    try {
        const entry = await post.findOne({ common: req.body.imageUrl });
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
        { common: req.body.imageUrl },
        { $pull: { 'comments.userId': req.body.userId } },
        function (e, doc) {
            if (e) {
                console.log('Error DeleteComment: ' + e);
            } else {
                res.json(doc);
            }
        }
    )
});

router.post(routes.addlike, async function (req, res) {
    const data = {
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        userId: req.body.userId,
    }

    try {
        const entry = await likes.findOne({ posturl: req.body.posturl });
        if (entry == null) {
            const entry = new likes(
                { postUrl: req.body.posturl },
                { likes: data }
            );
            await entry.save();
        } else {
            entry.likes.push(data);
            await entry.save();
        }
    } catch (e) {
        console.log('Error addinglikes: ' + e);
    }
});

router.post(routes.undolike, async function (req, res) {
    post.findOneAndUpdate(
        { posturl: req.body.posturl },
        { $pull: { 'likes.userId': req.body.userId } },
        function (e, doc) {
            if (e) {
                console.log('Error undolikes: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
});
router.post(routes.icon, async function (req, res) {
    const newpost = new post(req.body);

    const snap = {
        name: newpost.name,
        imageUrl: newpost.imageUrl,
        description: newpost.description,
    };

    try {
        const entry = await snapshots.findOne({ userId: req.body.userId });
        if (entry == null) {
            const entry = new snapshots({
                userId: req.body.userId,
                snaps: snap
            });
            await entry.save();
        } else {
            entry.snaps.push(snap);
            await entry.save();
        }
        const locality = await posts.findOne({
            locality: req.body.locality,
            adminArea: req.body.adminArea,
        });
        if (locality == null) {
            const locality = new posts({
                locality: req.body.locality,
                adminArea: req.body.adminArea,
                snaps: snap,
            });
            await locality.save();
        } else {
            locality.snaps.push(snap);
            await locality.save();
            console.log('pppppppppppppppppppppppppppppp');
        }
        await newpost.save();
        const response = { message: 'Post Successfully added to' + req.body.name };
        res.json(response);
    } catch (e) {
        const response = { message: 'Error adding new post: ' + e }
        res.json(response);
    }
});

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

export default router;