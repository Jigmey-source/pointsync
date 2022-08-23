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
        { locality: req.body.locality, adminArea: req.body.adminArea, 'records.link': req.body.link },
        { $set: { 'records.admin': req.body.userId }, },
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
            { locality: req.body.locality, adminArea: req.body.adminArea },
            { $push: { record: rd } },
            { upsert: true, new: true },
            function (e, doc) {
                if (e) {
                    console.log('Error adding record: ' + e);
                } else {
                    console.log('New record added');
                }
            }
        );
        await add.save();
        res.json("New record added! " + req.body.title);
    } catch (e) {
        res.json(e);
    }
});

router.post(routes.add, async function (req, res) {
    const add = new stores(req.body);
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
        records.findOneAndUpdate(
            { locality: req.body.locality, adminArea: req.body.adminArea },
            { $push: { record: rd } },
            { upsert: true, new: true },
        ).then(function () {
            console.log('New record added');
        }).catch(function (e) {
            console.log('Error adding record: ' + e);
        });
        await add.save();
        res.json('New record added! ' + req.body.title);
    } catch (e) {
        console.log('Error adding record : ' + e);
        res.json(e);
    }
});

export default router;