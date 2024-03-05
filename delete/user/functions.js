import admin from 'firebase-admin';
import user from '../../models/user.js';
import feeds from '../../models/feeds.js';
import followers from '../../models/followers.js';
import notifications from '../../models/notifications.js';
import snapshots from '../../models/snapshots.js';
import searchhistory from '../../models/search_history.js';
import stores from '../../models/store.js';
import post from '../../models/post.js';
import icons from '../../models/icons.js';

export async function deleteauth(id) { 
    try {
        await admin.auth().deleteUser(id);
    } catch (e) { 
        console.log('ERROR DELETING USER IN FIREBASEAUTH: ' + e);
        res.json('ERROR DELETING USER IN COLLECTIONS: ' + e);
    }
}

export function deleteuser(id) {
    user.deleteOne({
        userId: id
    }).then(function () {
        console.log('USER DELETED IN USER COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER IN USER COLLECTION');
    });
};

export function deletefeeds(id) {
    feeds.deleteOne({
        userId: id
    }).then(function () {
        console.log('USER DELETED IN FEEDS COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER IN FEEDS COLLECTION');
    });
}

export function deletefollowers(id) {
    followers.deleteOne({
        userId: id
    }).then(function () {
        console.log('USER DELETED IN FOLLOWERS COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER IN FOLLOWERS COLLECTION');
    });
}

export function deletenotifications(id) {
    notifications.deleteOne({
        userId: id
    }).then(function () {
        console.log('USER DELETED IN NOTIFICATIONS COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER IN NOTIFICATIONS COLLECTION');
    });
}

export function deletesnapshots(id) {
    snapshots.deleteOne({
        userId: id
    }).then(function () {
        console.log('USER DELETED IN SNAPSHOTS COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER IN SNAPSHOTS COLLECTION');
    });
}

export function deleteusersearchhistory(id) {
    searchhistory.deleteOne({
        userId: id
    }).then(function () {
        console.log('USER DELETED IN SEARCHHISTORY COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER IN SEARCHHISTORY COLLECTION');
    });
}

export function deleteinstores(id) {
    stores.deleteMany(
        { admin: id }
    ).then(function () {
        console.log('USER ELEMENT DELETED IN STORES COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN STORES COLLECTION: ' + e);
    });
}

export function deleteinposts(id) {
    post.deleteMany(
        { userId: id },
    ).then(function () {
        console.log('USER ELEMENT DELETED IN POSTS COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN POSTS COLLECTION: ' + e);
    });
}

export function deleteinreports(id) {
    reports.deleteMany(
        { userId: id },
    ).then(function () {
        console.log('USER ELEMENT DELETED IN REPORTS COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN REPORTS COLLECTION: ' + e);
    });
}

//TODO need to test this function and functionname exists in update posts file so change it and move it  there
export function deleteicons(id) {
    icons.updateOne(
        { 'icons.userId': id },
        { $pull: { 'icons': { userId: id } } }
    ).then(function () {
        console.log('USER DELETED IN ICONS COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER IN ICONS: ' + e);
    });
}