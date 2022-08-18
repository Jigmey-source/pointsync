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

router.post(routes.newreview, async function (req, res) {
    const review = {
        locality: req.body.locality,
        adminArea: req.body.adminArea,
        name: req.body.name,
        link: req.body.link,
        rate: req.body.rate,
        userId: req.body.userId,
        review: req.body.review,
    };
    try {
        const entry = await store.findOne({ link: req.body.common });
        entry.reviews.add(review);
        await entry.save();
    } catch (e) {
        console.log('Error addingreview: ' + e);
        res.json(e);
    }
});

router.post(routes.deletereview, async function (req, res) {
    stores.findOneAndUpdate(
        { imageUrl: req.body.link },
        { $pull: { 'records.userId': req.body.userId } },
        function (e, doc) {
            if (e) {
                console.log('Error deletingreview: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
});

router.post(routes.response, async function (req, res) {
    const data = {
        title: req.body.title,
        content: req.body.content
    };
    stores.findOneAndUpdate(
        { link: req.body.link },
        { $set: { 'commends.$[el].response': data } },
        { arrayFilters: [{ 'el.userId': req.body.userId }] },
        function (e, doc) {
            if (e) {
                console.log('Error response: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
});

export default router;