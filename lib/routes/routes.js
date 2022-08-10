import { Router } from 'express';
const router = Router();
import user from '../models/user.js';

router.post("/signUp", async function (req, res) {
    const muser = new user({
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

router.post('/user', async function (req, res) {
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(req.body.userId);
    user.findOne({ userId: req.body.userId }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn: ' + doc.$where.name);
            res.json(doc);
        }
    });
});

export default router;
