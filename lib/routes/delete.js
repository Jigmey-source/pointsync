import { Router } from 'express';
const router = Router();

import admin from 'firebase-admin';

import user from '../models/user.js';
import post from '../models/post.js';
import icons from '../models/icons.js';
import likes from '../models/likes.js';
import feeds from '../models/feeds.js';
import stores from '../models/store.js';
import followers from '../models/followers.js';
import snapshots from '../models/snapshots.js';
import searches from '../models/search_history.js';
import notifications from '../models/notifications.js';
import records from '../models/records.js';
import Route from '../const/route.js';
import reports from '../models/reports.js';

const routes = new Route();

router.post(routes.user, async function (req, res) {
    const id = req.body.userId;
    try {
        deleteauth(id);
        deleteuser(id);
        deletefeeds(id);
        deletefollowers(id);
        deletenotifications(id);
        deleteusersearchhistory(id);
        deletesnapshots(id);
        deleteinstores(id);
        deleteinposts(id);
        deleteinreports(id);

        deleteicons(id);
        deleteinhistory(id);
        deleteinlocality(id);
        deleteinfollowing(id);
        deleteinreviews(id);
        deleteincommends(id);
        deleteincomments(id);
        deleteinlikes(id);

        //deleteposts and records with their already routes
        res.json('SUCCESSFULLY DELETED USER FROM ALL COLLECTIONS');
    } catch (e) {
        console.log('ERROR DELETING USER IN FIREBASE AUTHENTICATION');
        res.json('ERROR DELETING USER IN COLLECTIONS: ' + e);
    }
});

async function deleteauth(id) {
    try {
        await admin.auth().deleteUser(id);
    } catch (e) {
        console.log('ERROR DELETING USER IN FIREBASEAUTH: ' + e);
    }
}

function deleteuser(id) {
    user.deleteOne({
        userId: id
    }).then(function () {
        console.log('USER DELETED IN USER COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER IN USER COLLECTION');
    });
};

function deletefeeds(id) {
    feeds.deleteOne({
        userId: id
    }).then(function () {
        console.log('USER DELETED IN FEEDS COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER IN FEEDS COLLECTION');
    });
}

function deletefollowers(id) {
    followers.deleteOne({
        userId: id
    }).then(function () {
        console.log('USER DELETED IN FOLLOWERS COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER IN FOLLOWERS COLLECTION');
    });
}

function deletenotifications(id) {
    notifications.deleteOne({
        userId: id
    }).then(function () {
        console.log('USER DELETED IN NOTIFICATIONS COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER IN NOTIFICATIONS COLLECTION');
    });
}

function deletesnapshots(id) {
    snapshots.deleteOne({
        userId: id
    }).then(function () {
        console.log('USER DELETED IN SNAPSHOTS COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER IN SNAPSHOTS COLLECTION');
    });
}

function deleteusersearchhistory(id) {
    searches.deleteOne({
        userId: id
    }).then(function () {
        console.log('USER DELETED IN SEARCHHISTORY COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER IN SEARCHHISTORY COLLECTION');
    });
}

function deleteinstores(id) {
    stores.deleteMany(
        { admin: id }
    ).then(function () {
        console.log('USER ELEMENT DELETED IN STORES COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN STORES COLLECTION: ' + e);
    });
}

function deleteinposts(id) {
    post.deleteMany(
        { userId: id },
    ).then(function () {
        console.log('USER ELEMENT DELETED IN POSTS COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN POSTS COLLECTION: ' + e);
    });
}

function deleteinreports(id) {
    reports.deleteMany(
        { userId: id },
    ).then(function () {
        console.log('USER ELEMENT DELETED IN REPORTS COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN REPORTS COLLECTION: ' + e);
    });
}

function deleteicons(id) {
    icons.updateOne(
        { 'icons.userId': id },
        { $pull: { 'icons': { userId: id } } }
    ).then(function () {
        console.log('USER DELETED IN ICONS COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER IN ICONS: ' + e);
    });
}

function deleteinhistory(id) {
    searches.updateMany(
        { 'users.userId': id },
        { $pull: { 'users': { userId: id } } }
    ).then(function () {
        console.log('USER ELEMENT DELETED IN SEARCHHISTORY COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN SEARCHHISTORY COLLECTION: ' + e);
    });
}

function deleteinlocality(id) {
    records.updateOne(
        { 'records.admin': id },
        { $pull: { 'records': { admin: id } } }
    ).then(function () {
        console.log('USER ELEMENT DELETED IN LOCALITY COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN LOCALITY COLLECTION: ' + e);
    });
}

function deleteinfollowing(id) {
    user.updateMany(
        { 'following.userId': id },
        { $pull: { 'following': { userId: id } } }
    ).then(function () {
        console.log('USER ELEMENT DELETED IN FOLLOWING SUB-COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN FOLLOWING SUB-COLLECTION: ' + e);
    });
}

function deleteinreviews(id) {
    stores.updateMany(
        { 'reviews.userId': id },
        { $pull: { 'reviews': { userId: id } } }
    ).then(function () {
        console.log('USER ELEMENT DELETED IN REVIEWS SUB-COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN REVIEWS SUB-COLLECTION: ' + e);
    });
}

function deleteincommends(id) {
    stores.updateMany(
        { 'commends.userId': id },
        { $pull: { 'commends': { userId: id } } }
    ).then(function () {
        console.log('USER ELEMENT DELETED IN COMMENDS SUB-COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN COMMENDS SUB-COLLECTION: ' + e);
    });
}

function deleteincomments(id) {
    post.updateOne(
        { 'comments.userid': id },
        { $pull: { 'comments': { userId: id } } }
    ).then(function () {
        console.log('USER ELEMENT DELETED IN POST COMMENTS SUB-COLLECTIONS');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN COMMENTS SUB-COLLECTION');
    });
}

function deleteinlikes(id) {
    likes.updateOne(
        { 'likes.userId': id },
        { $pull: { 'likes': { userId: id } } }
    ).then(function () {
        console.log('USER ELEMENT DELETED IN LIKES SUB-COLLECTIONS');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN LIKES SUB-COLLECTION');
    });
}

export default router;