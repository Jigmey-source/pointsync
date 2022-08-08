import express from 'express';
import user from '../models/user';

const router = express.Router();

router.post('/list', async function (req, res) { 
    var users = await user.find({ userId: req.body.userid });
    res.json(users);
});

router.post('/add', async function (req, res) {
    const muser = new user({
        blocked: {},
        description: 'helloooo',
        followers: 5,
        following: {},
        group: 'Tibet',
        hideFrom: {},
        place_marker: {
            online: true,
            country: 'India',
            locality: 'Manali',
            geoPoint: {
                lat: 0,
                lng: 0,
            },
            adminArea: 'Himachal Pradesh',
        },
        posts: 7,
        name: 'goni',
        platform: {},
        profile_picture: {},
        userId: '007',
    });
    await muser.save();

    const response = { message: "New user added to users" };
    res.json(response);
});

export default router;
