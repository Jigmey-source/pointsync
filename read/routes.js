import { Router } from "express";
import { placehistory, userhistory } from "./history/controllers.js";
import { newnotifications, notifications } from "./notification/controllers.js";
import { checklike, comments, getfeeds, landmarks, readlikes, localityposts, markers, getpost, getsnaps } from "./post/controllers.js";
import { store, checkstar, catalogue, reviews, commends, stores, newplaces, searchrecord } from "./store/controllers.js";
import { currentlocation, getfollowers, following, hidefrom, newusers, online, onlinepeople, getuser } from "./user/controllers.js";
import { getreports } from "./reports/controllers.js";

const router = Router();

router.post('/user_history', userhistory);

router.post('/place_history', placehistory);

router.post('/new_notifications', newnotifications);

router.post('/notifications', notifications);

router.post('/locality_posts', localityposts);

router.post('/checklike', checklike);

router.post('/post', getpost);

router.post('/snapshots', getsnaps);

router.post('/landmarks', landmarks);

router.post('/feeds', getfeeds);

router.post('/markers', markers);

router.post('/comments', comments);

router.post('/likes', readlikes);

router.post('/store', store);

router.post('/checkstar', checkstar);

router.post('/catalogue', catalogue);

router.post('/reviews', reviews);

router.post('/commends', commends);

router.post('/stores', stores);

router.post('/new_places', newplaces);

router.post('/search_record', searchrecord);

router.post('/current_location', currentlocation);

router.post('/user', getuser);

router.post('/following', following);

router.post('/followers', getfollowers);

router.post('/hidefrom', hidefrom);

router.post('/online_people', onlinepeople);

router.post('/online', online);

router.post('/new_users', newusers);

// TODO this function is called in reports app which is different than pointsync 
router.post('/reports', getreports);

export default router;
