import { Router } from "express";
import user from "./models/user.js";

const router = Router();

router.post('/register', async (req, res) => {
    const muser = new user({
        group: req.body.group,
        placemarker: req.body.placemarker,
        name: req.body.name,
        token: req.body.token,
        userId: req.body.userId,
    });
    console.log('inside createuser method registration aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    try {
        await muser.save();
        const response = { message: "New User has been created" };
        res.json(response);
    } catch (e) {
        console.log('ERROR: creating new user ' + e);
        res.json(e);
    }
    console.log('after createuser try catch function ddddddddddddddddddddddd');
});

export default router;