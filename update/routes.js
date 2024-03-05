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

router.post('/new_user_to_history', newusertohistory);

router.post('/new_place_to_history', newplacetohistory);

router.post('/new_store_to_history', newstoretohistory);

router.post('/pull_user_from_history', pulluserfromhistory);

router.post('/pull_place_from_history', pullplacefromhistory);

router.post('/notification', notification);

router.post('/post_description', postdescription);

router.post('/response', response);

router.post('/store_description', storedescription);

router.post('/event', event);

router.post('/image', image);

router.post('/owner', owner);

router.post('/admin_request', adminrequest);

router.post('/cancel_request', cancelrequest);

router.post('/token', token);

router.post('/alternate_token', alternatetoken);

router.post('/relocation', relocation);

router.post('/follow', follow);

router.post('/followee', followee);

router.post('/unfollow', unfollow);

router.post('/enablelocation', enablelocation);

router.post('/disablelocation', disablelocation);

router.post('/work', work);

router.post('/block', block);

router.post('/unblock', unblock);

router.post('/hide', hide);

router.post('/display', display);

router.post('/bio', bio);

router.post('/group', group);

router.post('/name', name);

router.post('/profile_picture', profilepicture);

export default router;