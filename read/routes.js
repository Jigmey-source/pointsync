import { Router } from "express";
import { placehistory, userhistory } from "./history/controllers.js";
import { newnotifications, notifications } from "./notification/controllers.js";
import { checklike, comments, getfeeds, landmarks, readlikes, localityposts, markers, getpost, getsnaps } from "./post/controllers.js";
import { store, checkstar, catalogue, reviews, commends, getstores, newplaces, searchrecord } from "./store/controllers.js";
import { currentlocation, getfollowers, following, hidefrom, newusers, online, onlinepeople, getuser } from "./user/controllers.js";
import { getreports } from "./reports/controllers.js";

const router = Router();

router.post('/catalogue', catalogue);
router.post('/checklike', checklike);
router.post('/checkstar', checkstar);
router.post('/commends', commends);
router.post('/comments', comments);
router.post('/current_location', currentlocation);
router.post('/feeds', getfeeds);
router.post('/following', following);
router.post('/followers', getfollowers);
router.post('/hidefrom', hidefrom);
router.post('/likes', readlikes);
router.post('/landmarks', landmarks);
router.post('/locality_posts', localityposts);
router.post('/markers', markers);
router.post('/new_notifications', newnotifications);
router.post('/notifications', notifications);
router.post('/new_users', newusers);
router.post('/new_places', newplaces);
router.post('/online', online);
router.post('/online_people', onlinepeople);
router.post('/place_history', placehistory);
router.post('/post', getpost);

// TODO this function is called in reports app which is different than pointsync 
router.post('/reports', getreports);

router.post('/reviews', reviews);
router.post('/snapshots', getsnaps);
router.post('/store', store);
router.post('/stores', getstores);
router.post('/search_record', searchrecord);
router.post('/user', getuser);
router.post('/user_history', userhistory);

export default router;
