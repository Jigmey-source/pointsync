import { Router } from 'express';
const router = Router();
import user from '../models/user.js';

router.post("/signUp", async function (req, res) {
    const muser =  new user({
        blocked: {},
        description: '',
        group: req.body.group,
        hideFrom: {},
        placemarker: req.body.placemarker,
        name: req.body.name,
        userId: req.body.userId,
        token: req.body.token,
    });
    await muser.save();

    const response = { message: "New Note Created! " + `id: ${req.body.id}` };
    console.log('lllllllllllllllllllllllllllll: ' + req.body.placemarker);
    res.json(response);
});

router.get('/user', async function (req, res) { 
    var user = await user.find({ userId: req.body.userId });
    res.json(user);
});

export default router;
