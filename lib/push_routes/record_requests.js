import { Router } from 'express';
const router = Router();

import Route from '../const/route.js';

import records from '../models/records.js';
import stores from '../models/store.js';
import recommends from '../models/recommends.js';

const routes = new Route();

router.post(routes.delete, async function (req, res) {
    records.findOneAndUpdate(
        { locality: req.body.locality, adminArea: req.body.adminArea },
        { $pull: { imageUrl: req.body.imageUrl } },
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
        { arrayFilter: [{ 'el.imageUrl': req.body.imageUrl }] },
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
        imageUrl: req.body.imageUrl,
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
        imageUrl: req.body.imageUrl,
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
        { arrayFilters: [{ 'el.imageUrl': req.body.imageUrl }] },
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
        { arrayFilters: [{ 'el.imageUrl': req.body.imageUrl }] },
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
        { $set: { 'records.$[el].imageUrl': req.body.common } },
        { arrayFilters: [{ 'el.imageUrl': req.body.imageUrl }] },
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
        imageUrl: req.body.imageUrl,
        rate: req.body.rate,
        userId: req.body.userId,
        review: req.body.review,
    };
    try {
        const entry = await store.findOne({ imageUrl: req.body.common });
        entry.reviews.add(review);
        await entry.save();
    } catch (e) {
        console.log('Error addingreview: ' + e);
        res.json(e);
    }
});

router.post(routes.deletereview, async function (req, res) {
    stores.findOneAndUpdate(
        { imageUrl: req.body.common },
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

router.post(routes.recommend, async function (req, res) {
    const data = {
        userId: req.body.userId,
        name: req.body.name,
        imageUrl: req.body.imageUrl
    }

    try {
        const entry = await recommends.findOne({ imageUrl: res.body.common });
        if (entry == null) {
            const entry = new recommends({
                imageUrl: req.body.common,
                commends: data,
            });
            await entry.save();
        } else {
            entry.commends.push(data);
            await entry.save();
        }
        const response = { message: 'New recommendation added' + req.body.name }
        res.json(response);
    } catch (e) {
        console.log('Error recommending: ' + e);
        res.json(e);
    }
});

router.post(routes.decrement, async function (req, res) {
    recommends.findOneAndUpdate(
        { imageUrl: req.body.common },
        { $pull: { 'commends.userId': req.body.userId } },
        function (e, doc) {
            if (e) {
                console.log('Error decrementing: ' + e);
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
        { imageUrl: req.body.common },
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