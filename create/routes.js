import { Router } from "express";
// import user from "../models/user.js";
import {
    comment, icon, inventory, like, notification,
    recommend, report, review, snapshot, store,
    // account
} from "./controllers.js";

const router = Router();

router.post('/notification', notification);

router.post('/icon', icon);

router.post('/snapshot', snapshot);

router.post('/like', like);

router.post('/comment', comment);

router.post('/report', report);

router.post('/recommend', recommend);

router.post('/review', review);

router.post('/inventory', inventory);

router.post('/store', store);

// router.post('/account', account);
// router.post('/account', async (req, res) => {
//     const muser = new user({
//         group: req.body.group,
//         placemarker: req.body.placemarker,
//         name: req.body.name,
//         token: req.body.token,
//         userId: req.body.userId,
//     });
//     console.log('inside createuser method registration aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
//     try {
//         await muser.save();
//         const response = { message: "New User has been created" };
//         res.json(response);
//     } catch (e) {
//         console.log('ERROR: creating new user ' + e);
//         res.json(e);
//     }
//     console.log('after createuser try catch function ddddddddddddddddddddddd');
// });

export default router;