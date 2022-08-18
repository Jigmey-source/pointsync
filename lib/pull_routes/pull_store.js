import { Router } from 'express';
const router = Router();

import store from '../models/store.js';
import Route from '../const/route.js';

const routes = new Route();

router.post(routes.get, async function (req, res) { 
    store.find({ imageUrl: req.body.common }, function (e, doc) {
        if (e) {
            console.log('Error getting Store: ' + e);
            res.json(e);
        } else {
            res.json(doc);
        }
    });
})

export default router;
