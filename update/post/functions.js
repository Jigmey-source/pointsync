import post from "../../models/post.js";
import icons from "../../models/icons.js";
import feeds from "../../models/feeds.js";
import snapshots from "../../models/snapshots.js";
import likes from "../../models/likes.js";

export function deletecomment(id, link, comment) {
    post.updateOne(
        { link: link },
        { $pull: { 'comments': { userId: id, comment: comment } } },
    ).catch(function (e) {
        console.log('Error DeleteComment: ' + e);
    });
}

export function deleteinicons(link) {
    icons.updateOne(
        { 'icons.link': link },
        { $pull: { 'icons': { link: link } } },
    ).catch(function (e) {
        console.log('Error deleting in Icons: ' + e);
    });
}

export function deleteincomments(id) {
    post.updateOne(
        { 'comments.userid': id },
        { $pull: { 'comments': { userId: id } } }
    ).then(function () {
        console.log('USER ELEMENT DELETED IN POST COMMENTS SUB-COLLECTIONS');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN COMMENTS SUB-COLLECTION');
    });
}

export function undolike(id, link) {
    likes.updateOne(
        { link: link },
        { $pull: { 'likes': { userId: id } } },
    ).catch(function (e) {
        console.log('Error undolikes: ' + e);
    });
}

export function deleteinsnapshots(link) {
    snapshots.updateOne(
        { 'snaps.link': link },
        { $pull: { 'snaps': { link: link } } },
    ).catch(function (e) {
        console.log('Error deleting post in Snapshots: ' + e);
    });
}

export function deleteinlikes(id) {
    likes.updateOne(
        { 'likes.userId': id },
        { $pull: { 'likes': { userId: id } } }
    ).then(function () {
        console.log('USER ELEMENT DELETED IN LIKES SUB-COLLECTIONS');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN LIKES SUB-COLLECTION');
    });
}

export function savesnapshot(id, data) {
    snapshots.findOneAndUpdate(
        { userId: id },
        { $push: { snaps: data } },
        { upsert: true, new: true },
    ).catch(function (e) {
        console.log('Error adding new snapshot: ' + e);
    });
}

export function saveicon(locality, adminArea, data) {
    icons.updateOne(
        { locality: locality, adminArea: adminArea },
        { $push: { icons: data } },
        { upsert: true, new: true }
    ).catch(function (e) {
        console.log('ERROR ADDING NEW ICON: ' + e);
    });
}

export function addlike(link, data) {
    likes.findOneAndUpdate(
        { link: link },
        { $push: { likes: data } },
        { upsert: true, new: true },
    ).catch(function (e) {
        console.log('Error adding new like: ' + e);
    });
}

export function addcomment(link, comment) {
    post.updateOne(
        { link: link },
        { $push: { comments: comment } },
        { upsert: true, new: true },
    ).catch(function (e) {
        console.log('Error adding comment: ' + e);
    });
}

export function updatepostdescription(link, description) {
    post.updateOne(
        { link: link },
        { $set: { 'description': description } },
    ).catch(function (e) {
        console.log('Post description: ' + e);
    });
}

export function updatesnapdescription(link, description) {
    snapshots.updateOne(
        { 'snaps.link': link },
        { $set: { 'snaps.$[el].description': description } },
        { arrayFilters: [{ 'el.link': link }] },
    ).catch(function (e) {
        console.log('Error updating description in snapshots: ' + e);
    });
}

export function updateicondescription(link, description) {
    icons.updateOne(
        { 'icons.link': link },
        { $set: { 'icons.$[el].description': description } },
        { arrayFilters: [{ 'el.link': link }] },
    ).catch(function (e) {
        console.log('Error updating description in icons: ' + e);
    });
}

export function updatedescriptioninfeeds(link, description) {
    feeds.updateMany(
        { 'feeds.link': link },
        { $set: { 'feeds.$[el].description': description } },
        { arrayFilters: [{ 'el.link': link }] },
    ).catch(function (e) {
        console.log('Error updating description in feeds: ' + e);
    });
}

export function incrementcomments(link, i) {
    post.updateOne(
        { link: link },
        { $inc: { 'totalcomments': i } },
    ).catch(function (e) {
        console.log('Error incrementing posts: ' + e);
    });
}

export function incrementlikes(link, i) {
    post.updateOne(
        { link: link },
        { $inc: { 'likes': i } },
    ).catch(function (e) {
        console.log('Error incrementing likes: ' + e);
    });
}
