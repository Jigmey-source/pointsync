import { Router } from 'express';
const router = Router();

import Route from '../const/route.js';

import records from '../models/records.js';
import stores from '../models/store.js';

const routes = new Route();

router.post(routes.delete, async function (req, res) {
    records.updateOne(
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
    );
});

router.post(routes.owner, async function (req, res) {
    records.updateOne(
        { locality: req.body.locality },
        { adminArea: req.body.adminArea },
        { 'record.link': req.body.link },
        { $set: { 'record.admin': req.body.userId }, },
        { upsert: true },
        function (e, doc) {
            if (e) {
                console.log('Error Admin: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
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
        records.updateOne(
            { locality: req.body.locality },
            { adminArea: req.body.adminArea },
            { $push: { record: rd } },
            { upsert: true, new: true },
            function (e, doc) {
                if (e) {
                    console.log('Error adding record: ' + e);
                } else {
                    console.log('New record added');
                }
            }
        ).exec();
        await add.save();
        res.json("New record added! " + req.body.title);
    } catch (e) {
        res.json(e);
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
        // const entry = await records.findOne({
        //     locality: req.body.locality,
        //     adminArea: req.body.adminArea
        // });
        // if (entry == null) {
        //     const entry = new records({
        //         locality: req.body.locality,
        //         adminArea: req.body.adminArea,
        //         record: rd,
        //     });
        //     await entry.save();
        // } else {
        //     entry.record.push(rd);
        //     await entry.save();
        // }
        // await add.save();
        records.updateOne(
            { locality: req.body.locality },
            { adminArea: req.body.adminArea },
            { $push: { record: rd } },
            { upsert: true, new: true },
            function (e, doc) {
                if (e) {
                    console.log('Error adding record: ' + e);
                } else {
                    console.log('New record added');
                }
            }
        ).exec();
        await add.save();
        res.json('New record added! ' + req.body.title);
    } catch (e) {
        console.log('Error adding record : ' + e);
        res.json(e);
    }
});

router.post(routes.updatedescription, async function (req, res) {
    records.updateOne(
        { locality: req.body.locality },
        { adminArea: req.body.adminArea },
        { 'record.link': req.body.link },
        { $set: { 'records.description': req.body.description } },
        { upsert: true },
        function (e, doc) {
            if (e) {
                console.log('Error Updatedescription: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    ).exec();
});

router.post(routes.updateevent, async function (req, res) {
    records.updateOne(
        { locality: req.body.locality },
        { adminArea: req.body.adminArea },
        { 'record.link': req.body.link },
        { $set: { 'records.event': req.body.event } },
        { upsert: true },
        function (e, doc) {
            if (e) {
                console.log('Error UpdateEvent: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
});

router.post(routes.updateimage, async function (req, res) {
    records.updateOne(
        { locality: req.body.locality },
        { adminArea: req.body.adminArea },
        { 'record.link': req.body.link },
        { $set: { 'records.link': req.body.common } },
        { upsert: true },
        function (e, doc) {
            if (e) {
                console.log('Error UpdateImage: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
});

export default router;