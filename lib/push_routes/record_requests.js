import { Router } from 'express';
const router = Router();

import Route from '../const/route.js';

import records from '../models/records.js';
import stores from '../models/store.js';

const routes = new Route();

router.post(routes.delete, async function (req, res) {
    records.findOneAndUpdate(
        { locality: req.body.locality, adminArea: req.body.adminArea },
        { $pull: { link: req.body.link } },
        function (e, doc) {
            if (e) {
                console.log('Record delete: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
});

router.post(routes.owner, async function (req, res) {
    records.findOneAndUpdate(
        { locality: req.body.locality },
        { adminArea: req.body.adminArea },
        { $set: { 'records.$[el].admin': req.body.userId }, },
        { arrayFilter: [{ 'el.link': req.body.link }] },
        { upsert: true },
        function (e, doc) {
            if (e) {
                console.log('Error Admin: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
});

router.post(routes.inventory, async function (req, res) {
    const add = new stores(req.body);
    // const rd = new records(req.body);
    // const rd = new records.record(req.body);
    const rd = {
        event: req.body.event,
        type: req.body.type,
        title: req.body.title,
        link: req.body.link,
        average_rate: req.body.average_rate,
        recommendations: req.body.recommendations,
    }

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
            await entry.save();
        }
        await add.save();
        const response = { message: "New record added! " + req.body.title };
        res.json(response);
        console.log('sssuuucceeesss');
    } catch (e) {
        console.log('Error Inventory: ' + e);
        const response = { message: 'Error uploading record: ' + e };
        res.json(response);
    }
});

router.post(routes.add, async function (req, res) {
    const add = new stores(req.body);
    // const rd = new records.record(req.body);
    const rd = {
        point: req.body.point,
        event: req.body.event,
        type: req.body.type,
        title: req.body.title,
        link: req.body.link,
        average_rate: req.body.average_rate,
        recommendations: req.body.recommendations,
    }

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
            await entry.save();
        }
        await add.save();
        const response = { message: "New record added! " + req.body.title };
        res.json(response);
        console.log('sssuuucceeesss');
    } catch (e) {
        console.log('Error adding record : ' + e);
        const response = { message: 'Error uploading record: ' + e };
        res.json(response);
    }
});

router.post(routes.updatedescription, async function (req, res) {
    records.findByIdAndUpdate(
        { locality: req.body.locality },
        { adminArea: req.body.adminArea },
        { $set: { 'records.$[el].description': req.body.description } },
        { arrayFilters: [{ 'el.link': req.body.link }] },
        { upsert: true },
        function (e, doc) {
            if (e) {
                console.log('Error Updatedescription: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
});
router.post(routes.updateevent, async function (req, res) {
    records.findByIdAndUpdate(
        { locality: req.body.locality },
        { adminArea: req.body.adminArea },
        { $set: { 'records.$[el].event': req.body.event } },
        { arrayFilters: [{ 'el.link': req.body.link }] },
        { upsert: true },
        function (e, doc) {
            if (e) {
                console.log('Error UpdateEvent: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
});
router.post(routes.updateimage, async function (req, res) {
    records.findByIdAndUpdate(
        { locality: req.body.locality },
        { adminArea: req.body.adminArea },
        { $set: { 'records.$[el].link': req.body.common } },
        { arrayFilters: [{ 'el.link': req.body.link }] },
        { upsert: true },
        function (e, doc) {
            if (e) {
                console.log('Error UpdateImage: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
});

export default router;