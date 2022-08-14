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
    } catch (e) {
        console.log('Error uploading record: ' + e);
    }
});
