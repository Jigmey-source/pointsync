import { Router } from 'express';
const router = Router();

import post from '../models/post.js';
import posts from '../models/posts.js';
import snaps from '../models/snaps.js';
import snapshots from '../models/snapshots.js';
import Route from '../const/route.js';

const routes = new Route();

router.post(routes.simplepost, async function (req, res) {
    const snap = new snaps(req.body);
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
    } catch (e) {
        console.log(e);
    }
});

router.post(routes.icon, async function (req, res) {
    const newpost = new post(req.body);

    const snap = new snaps({
        name: newpost.name,
        imageUrl: newpost.imageUrl,
        description: newpost.description,
    });

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
        const locality = await posts.findOne({
            locality: req.body.locality,
            adminArea: req.body.adminArea,
        });
        if (locality == null) {
            const locality = new posts({
                locality: req.body.locality,
                adminArea: req.body.adminArea,
                posts: newpost,
            });
            await locality.save();
        } else {
            locality.posts.push(newpost);
            await locality.save();
            console.log('pppppppppppppppppppppppppppppp');
        }
    } catch (e) {
        console.log(e);
    }
});

router.post(routes.posts, async function (req, res) {
    post.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$posts' },
        { $replaceRoot: { newRoot: '$posts' } },
        { $sort: { 'time_stamp': -1 } }
    ], function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log('posts eeeeeeeeeeeeeeeeeeeeeeeee');
            console.log(doc);
            res.json(doc);
        }
    });
});

export default router;