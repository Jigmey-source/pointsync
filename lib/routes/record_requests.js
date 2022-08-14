import { Router } from 'express';
const router = Router();

import Route from '../const/route.js';

import record from '../models/record.js';
import records from '../models/records.js';
import store from '../models/store.js';

const routes = new Route();

router.post(routes.add, async function (req, res) {
    const add = new store(req.body);
    const rd = new record(req.body);
    try {
        const entry = await records.findOne({
            locality: req.body.locality,
            adminArea: req.body.adminArea
        });
        if (entry == null) {
            const entry = new records({
                locality: req.body.locality,
                adminArea: req.body.adminArea,
                record: rd,
            });
            await entry.save();
        } else {
            entry.record.push(rd);
        }
        await add.save();
        const response = {message: "New record added! " + req.body.title }
        res.json(response);
    } catch (e) {
        const response = { message: 'Error uploading record: ' + e };
        res.json(response);
    }
});

router.post(routes.bazaar, async function (req, res) {
    const page = req.query.get || 0;
    const perPage = 20;
    records.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$record' },
        { $sort: { time_stamp: -1 } }, 
        { $skip: (page * perPage) }, 
        { $limit: perPage },
    ], function (e, doc) { 
        if (e) {
            res.send(500, e);
        } else {
            res.json(doc)
         }
    })
})

export default router;