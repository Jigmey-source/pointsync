import { Router } from "express";
import { placehistory, userhistory } from "./history/controllers";
import { newnotifications, notifications } from "./notification/controllers";
import { checklike, comments, feeds, landmarks, likes, localityposts, markers, post, snapshots } from "./post/controllers";
import { store, checkstar, catalogue, reviews, commends, stores, newplaces, searchrecord } from "./store/controllers";
import { currentlocation, followers, following, hidefrom, newusers, online, onlinepeople, user } from "./user/controllers";
import { reports } from "./reports/controllers";

const router = Router();

router.post('/user_history', userhistory);

router.post('/place_history', placehistory);

router.post('/new_notifications', newnotifications);

router.post('/notifications', notifications);

router.post('/locality_posts', localityposts);

router.post('/checklike', checklike);

router.post('/post', post);

router.post('/snapshots', snapshots);

router.post('/landmarks', landmarks);

router.post('/feeds', feeds);

router.post('/markers', markers);

router.post('/comments', comments);

router.post('/likes', likes);

router.post('/store', store);

router.post('/checkstar', checkstar);

router.post('/catalogue', catalogue);

router.post('/reviews', reviews);

router.post('/commends', commends);

router.post('/stores', stores);

router.post('/new_places', newplaces);

router.post('/search_record', searchrecord);

router.post('/current_location', currentlocation);

router.post('/user', user);

router.post('/following', following);

router.post('/followers', followers);

router.post('/hidefrom', hidefrom);

router.post('/online_people', onlinepeople);

router.post('/online', online);

router.post('/new_users', newusers);

// TODO this function is called in reports app which is different than pointsync 
router.post('/reports', reports);

export default router;
