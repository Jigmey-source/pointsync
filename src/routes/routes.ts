import express from 'express';
import user from '../models/user';

const router = express.Router();

router.post('/signUp', async function (req, res) {
    // const muser = new user({
    //     blocked: {},
    //     description: 'helloooo',
    //     followers: 5,
    //     following: {},
    //     group: 'Tibet',
    //     hideFrom: {},
    //     placemarker: {
    //         online: true,
    //         country: 'India',
    //         locality: 'Manali',
    //         geopoint: {
    //             lat: 0,
    //             lng: 0,
    //         },
    //         adminArea: 'Himachal Pradesh',
    //     },
    //     posts: 7,
    //     name: 'goni',
    //     platform: {},
    //     profile_picture: {},
    //     userId: '007',
    // });
    const muser = new user({
        blocked: {},
        description: '',
        followers: 0,
        grouP: req.body.group,
        hideFrom: {},
        placemarker: req.body.placemarker,
        posts: 0,
        name: req.body.name,
        platform: req.body.platform,
        profile_picture: {},
        userId: req.body.userId,
    });
    await muser.save();

    const response = { message: "User added: " + req.body.name };
    res.json(response);
});

export default router;
