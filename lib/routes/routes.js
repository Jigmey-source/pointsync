import { Router } from 'express';
const router = Router();
import user from '../models/user.js';

router.post("/signUp", async function (req, res) {
    const muser =  new user({
        blocked: {},
        description: '',
        followers: 0,
        grouP: req.body.group,
        hideFrom: {},
        placemarker: req.body.placemarker,
        posts: 0,
        name: req.body.name,
        profile_picture: req.body.profile_picture,
        userId: req.body.userId,
        token: req.body.token,
    });
    await muser.save();

    const response = { message: "New Note Created! " + `id: ${req.body.id}` };
    console.log('lllllllllllllllllllllllllllll: ' + req.body.placemarker);
    res.json(response);
});

export default router;
