import { Router } from "express";

import { notification } from "./notification/controllers.js";
import { postdescription } from "./post/controllers.js";
import {
    newplacetohistory, newstoretohistory, newusertohistory,
    pullplacefromhistory, pulluserfromhistory
} from "./history/controllers.js";
import {
    adminrequest, cancelrequest, event, image,
    owner, response, storedescription
} from "./store/controllers.js";
import {
    alternatetoken, bio, block, disablelocation, display,
    enablelocation, follow, followee, group, hide, name,
    profilepicture, relocation, token, unblock, unfollow, work
} from "./user/controllers.js";

const router = Router();

router.post('/admin_request', adminrequest);
router.post('/alternate_token', alternatetoken);
router.post('/block', block);
router.post('/bio', bio);
router.post('/cancel_request', cancelrequest);
router.post('/display', display);
router.post('/disablelocation', disablelocation);
router.post('/enablelocation', enablelocation);
router.post('/event', event);
router.post('/follow', follow);
router.post('/followee', followee);
router.post('/group', group);
router.post('/hide', hide);
router.post('/image', image);
router.post('/name', name);
router.post('/new_user_to_history', newusertohistory);
router.post('/new_place_to_history', newplacetohistory);
router.post('/new_store_to_history', newstoretohistory);
router.post('/notification', notification);
router.post('/owner', owner);
router.post('/profile_picture', profilepicture);
router.post('/post_description', postdescription);
router.post('/pull_user_from_history', pulluserfromhistory);
router.post('/pull_place_from_history', pullplacefromhistory);
router.post('/relocation', relocation);
router.post('/response', response);
router.post('/store_description', storedescription);
router.post('/token', token);
router.post('/unfollow', unfollow);
router.post('/unblock', unblock);
router.post('/work', work);

export default router;