import { Router } from 'express';
const router = Router();

import post from '../models/post.js';
import posts from '../models/posts.js';
import localityposts from '../models/locality_post.js';
import Route from '../const/route.js';

const routes = new Route();

router.post(routes.simplepost, async function (req, res) {
    const newpost = new post(req.body);
    try {
        const entry = await posts.findOne({ userId: req.body.userId });
        entry.posts.push(newpost);
        await entry.save();
    } catch (e) {
        console.log(e);
    }
});

router.post(routes.icon, async function (req, res) {
    const localitypost = new post(req.body);

    const newpost = new post({
        name: localitypost.name,
        imageUrl: localitypost.imageUrl,
        description: localitypost.description,
        _id: localitypost.schema.ObjectId,
    });

    try {
        const entry = await posts.findOne({ userId: req.body.userId });
        entry.posts.push(newpost);
        await entry.save();
        const locality = await localityposts.findOne({
            locality: req.body.locality,
            adminArea: req.body.adminArea,
        });
        if (locality == null) {
            const locality = new localityposts.create({
                locality: req.body.locality,
                adminArea: req.body.adminArea,
                posts: localitypost,
            });
            await locality.save();
        }
        locality.posts.push(localitypost);
        await locality.save();
        console.log('pppppppppppppppppppppppppppppp');
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