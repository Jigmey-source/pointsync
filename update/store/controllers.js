import stores from "../../models/store.js";
import { updateinnotifications } from "../notification/functions.js";
import { updateinrecord } from "../record/functions.js";
import { updateeventinstore } from "./functions.js";
import { updateeventinrecords } from "../record/functions.js";
import { updatestore, updatestores, updateinstore, updateinchildstores } from "./functions.js";

export const response = async (req, res) => {
    const data = {
        title: req.body.title,
        content: req.body.content
    };
    stores.updateOne(
        { link: req.body.link, 'reviews.userId': req.body.userId },
        { $set: { 'reviews.$.response': data } },
        function (e, doc) {
            if (e) {
                console.log('Error response: ' + e);
                res.json(e);
            } else {
                console.log('doc doc doc doc doc');
                console.log(doc);
                res.json(doc);
            }
        },
    );
}

export const storedescription = async (req, res) => { 
    stores.updateOne(
        { link: req.body.link },
        { $set: { description: req.body.description } },
        function (e, doc) {
            if (e) {
                console.log('Error Updatedescription: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
}

export const event = async (req, res) => { 
    try {
        updateeventinrecords(req.body.link, req.body.event);
        updateeventinstore(req.body.link, req.body.event);
        res.json('Updated event in store and records');
    } catch (e) {
        res.json(e);
    }
}

export const image = async (req, res) => { 
    try {
        updateinstore(req.body.link, req.body.common);
        updateinchildstores(req.body.link, req.body.common);
        updateinnotifications(req.body.link, req.body.common);
        updateinrecord(req.body.link, req.body.common);
        res.json('updated link in record and store');
    } catch (e) {
        res.json(e);
    }
}

export const owner = async (req, res) => { 
    try {
        updatestore(req.body.link, req.body.admin);
        updatestores(req.body.link, req.body.admin);
        res.json('success');
    } catch (e) {
        console.log('What is the error: ' + e);
        res.json(e);
    }
}

export const adminrequest = async (req, res) => { 
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
    );
}

export const cancelrequest = async (req, res) => { 
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
    );
}