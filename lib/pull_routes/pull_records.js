import { Router } from 'express';
const router = Router();

import store from '../models/store.js';

import Route from '../const/route.js';

const routes = new Route();

router.post(routes.search, async function (req, res) {
    store.find(
        { searchKey: req.body.searchKey },
        function (e, doc) {
            if (e) {
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
});