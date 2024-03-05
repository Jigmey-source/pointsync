import { Router } from "express";
import {
    comment, icon, inventory, like, notification,
    recommend, report, review, snapshot, store, account
} from "./controllers";

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

router.post('/account', account);

export default router;