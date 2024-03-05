import { Router } from "express";
import Route from "../const/route.js";
import { deleteinhistory } from "../update/history/functions.js";
import { deleteinlocality } from "../update/record/functions.js";
import { deleteinfollowing } from "../update/user/updatemany/functions.js";
import { deleteinreviews, deleteincommends } from "../update/store/functions.js";
import { deleteinlikes, deleteincomments } from "../update/post/functions.js";
import {
    comment, item, like, notification, post,
    recommendation, report, review, specificnotification
} from "./controllers.js";
import {
    deleteauth, deleteuser, deletefeeds, deletefollowers,
    deletenotifications, deletesnapshots, deleteusersearchhistory,
    deleteinstores, deleteinposts, deleteinreports, deleteicons
} from "./user/functions.js";

const router = Router();
const routes = new Route();

router.post('/notification', notification);

router.post('/specific_notification', specificnotification);

router.post('/post', post);

router.post('/comment', comment);

router.post('/like', like);

router.post('/report', report);

router.post('/item', item);

router.post('/recommendation', recommendation);

router.post('/review', review);

///TODO used in reports
router.post(routes.user, async function (req, res) {
    const id = req.body.userId;
    try {
        deleteauth(id);
        deleteuser(id);
        deletefeeds(id);
        deletefollowers(id);
        deletenotifications(id);
        deleteusersearchhistory(id);
        deletesnapshots(id);
        deleteinstores(id);
        deleteinposts(id);
        deleteinreports(id);

        deleteicons(id);
        deleteinhistory(id);
        deleteinlocality(id);
        deleteinfollowing(id);
        deleteinreviews(id);
        deleteincommends(id);
        deleteincomments(id);
        deleteinlikes(id);

        //deleteposts and records with their already routes
        res.json('SUCCESSFULLY DELETED USER FROM ALL COLLECTIONS');
    } catch (e) {
        console.log('ERROR DELETING USER IN FIREBASE AUTHENTICATION');
        res.json('ERROR DELETING USER IN COLLECTIONS: ' + e);
    }
});

export default router;