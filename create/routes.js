import { Router } from "express";
import {
    comment, icon, inventory, like, notification,
    productreview, recommend, report, review, snapshot, store,
} from "./controllers.js";

const router = Router();

router.post('/comment', comment);
router.post('/icon', icon);
router.post('/like', like);
router.post('/inventory', inventory);
router.post('/notification', notification);
router.post('/productreview', productreview);
router.post('/report', report);
router.post('/recommend', recommend);
router.post('/review', review);
router.post('/snapshot', snapshot);
router.post('/store', store);

export default router;