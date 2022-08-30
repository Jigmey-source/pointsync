import { Router } from 'express';
const router = Router();

import Route from '../const/route.js';

import records from '../models/records.js';
import stores from '../models/store.js';
import catalogues from '../models/catalogues.js';

const routes = new Route();

router.post(routes.delete, async function (req, res) {
    try {
        deletestore(req.body.link);
        deleterecord(req.body.link);
        deletecatalogue(req.body.link);
        res.json();
    } catch (e) {
        console.log('delete record error: ' + e);
        res.json(e);
    }
});

function deletestore(link) {
    stores.deleteOne({
        link: link
    }).then(function () {
        console.log('Store has been deleted');
    }).catch(function (e) {
        console.log('Error deleting store: ' + e);
    });
}

function deleterecord(link) {
    records.updateOne(
        { 'records.link': link },
        { $pull: { 'records': { link: link } } },
        function (e, doc) {
            if (e) {
                console.log('Error deleting record: ' + e);
            } else {
                console.log('record has been deleted');
            }
        }
    )
}

function deletecatalogue(link) {
    catalogues.deleteOne({
        link: link
    }).then(function () {
        console.log('Deleting catalogue successful');
    }).catch(function (e) {
        console.log('Error deleting catalogue: ' + e);
    })
}

router.post(routes.owner, async function (req, res) {
    try {
        updatestore(req.body.link, req.body.admin);
        updatestores(req.body.link, req.body.admin);
        res.json('success');
    } catch (e) {
        console.log('What is the error: ' + e);
        res.json(e);
    }
});

function updatestore(link, admin) {
    stores.updateOne(
        { link: link },
        { $set: { admin: admin } },
        { upsert: true },
        // function (e, doc) {
        //     if (e) {
        //         console.log('Error Admin: ' + e);
        //         res.json(e);
        //     } else {
        //         res.json(doc);
        //     }
        // }
    );
};

function updatestores(link, admin) {
    stores.updateMany(
        { parent: link },
        { $set: { admin: admin } },
        function (e, doc) {
            if (e) {
                console.log('Error setting admin to stores: ' + e);
            } else {
                console.log('Admin set on stores: ' + link + '-' + admin);
            }
        }
    )
};

router.post(routes.adminrequest, async function (req, res) {
    console.log(req.body);
    const data = {
        id: req.body.id,
        name: req.body.name,
        userId: req.body.userId,
    };

    stores.updateOne(
        { link: req.body.link },
        { $set: { request: data } },
        function (e, doc) {
            if (e) {
                console.log('Error adding request: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
});

router.post(routes.cancelrequest, async function (req, res) {
    stores.updateOne(
        { link: req.body.link },
        { $unset: { 'request': { userId: req.body.userId } } },
        function (e, doc) {
            if (e) {
                console.log('Error cancelling request: ' + e);
                res.json(e);
            } else {
                console.log('Request cancelled');
                res.json(doc);
            }
        }
    )
});

router.post(routes.inventory, async function (req, res) {
    const data = {
        admin: req.body.userId,
        event: req.body.event,
        type: req.body.type,
        title: req.body.title,
        link: req.body.link,
        averagerate: req.body.averagerate,
        recommendations: req.body.recommendations,
    }

    try {
        addrecord(req.body.locality, req.body.adminArea, data);
        addstore(req);
        addcatalogue(req.body.common, data);
        res.json("New record added! " + req.body.title);
    } catch (e) {
        res.json(e);
    }
});

function addcatalogue(link, data) {
    catalogues.updateOne(
        { link: link },
        { $push: { catalogue: data } },
        { upsert: true, new: true },
        function (e, doc) {
            if (e) {
                console.log('Error adding catalogue: ' + e);
            } else {
                console.log('New Catalogue added');
            }
        }
    );
}

router.post(routes.add, async function (req, res) {
    const data = {
        admin: req.body.userId,
        point: req.body.point,
        event: req.body.event,
        type: req.body.type,
        title: req.body.title,
        link: req.body.link,
        average_rate: req.body.average_rate,
        recommendations: req.body.recommendations,
    }

    try {
        addrecord(req.body.locality, req.body.adminArea, data);
        addstore(req);
        res.json('New record added! ' + req.body.title);
    } catch (e) {
        console.log('Error adding record : ' + e);
        res.json(e);
    }
});

function addrecord(locality, adminArea, data) {
    records.updateOne(
        { locality: locality, adminArea: adminArea },
        { $push: { records: data } },
        { upsert: true, new: true },
        // function (e, doc) {
        //     if (e) {
        //         console.log('Error adding record: ' + e);
        //     } else {
        //         console.log('New record added');
        //     }
        // }
    );
}

function addstore(req) {
    const add = new stores(req.body);
    add.save();
    // add.save(function (e, result) {
    //     if (e) {
    //         console.log('Error adding new store: ' + e);
    //     } else {
    //         console.log('Store added');
    //     }
    // })
}

export default router;