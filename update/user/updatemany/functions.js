import user from "../../../models/user";
import post from "../../../models/post";
import feeds from "../../../models/feeds";
import stores from "../../../models/store";
import likes from "../../../models/likes";
import icons from "../../../models/icons";
import followers from "../../../models/followers";
import searchhistory from "../../../models/search_history";
import snapshots from "../../../models/snapshots";

export function deleteinfollowing(id) {
    user.updateMany(
        { 'following.userId': id },
        { $pull: { 'following': { userId: id } } }
    ).then(function () {
        console.log('USER ELEMENT DELETED IN FOLLOWING SUB-COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN FOLLOWING SUB-COLLECTION: ' + e);
    });
}

export function updatenameinprofile(id, name) {
    user.findOneAndUpdate(
        { userId: id },
        { $set: { 'name': name } },
    ).catch(function (e) {
        console.log('Error updating name: ' + e);
    });
}

export function updatenameinposts(id, name) {
    post.updateMany(
        { userId: id },
        { $set: { name: name } },
    ).catch(function (e) {
        console.log('Error updating name in feeds: ' + e);
    });
}

export function updatenameinfeeds(id, name) {
    feeds.updateMany(
        { 'feeds.userId': id },
        { $set: { 'feeds.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating name in feeds: ' + e);
    });
}

export function updatenameinreviews(id, name) {
    stores.updateMany(
        { 'reviews.userId': id },
        { $set: { 'reviews.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating name in reviews: ' + e);
    });
}

export function updatenameincommends(id, name) {
    stores.updateMany(
        { 'commends.userId': id },
        { $set: { 'commends.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating name in commends: ' + e);
    });
}

export function updatenameincomments(id, name) {
    post.updateMany(
        { 'comments.userId': id },
        { $set: { 'comments.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating name in comments: ' + e);
    });
}

export function updatenameinlikes(id, name) {
    likes.updateMany(
        { 'likes.userId': id },
        { $set: { 'likes.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating name in likes: ' + e);
    });
}

export function updatenameinicons(id, name) {
    icons.updateMany(
        { 'icons.userId': id },
        { $set: { 'icons.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating name in icons: ' + e);
    });
}

export function updatenameinfollowers(id, name) {
    followers.updateMany(
        { 'followers.userId': id },
        { $set: { 'followers.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating name in followers: ' + e);
    });
}

export function updatenameinsearches(id, name) {
    searchhistory.updateMany(
        { 'users.userId': id },
        { $set: { 'users.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating name in searches: ' + e);
    });
}

export function updatenameinsnapshots(id, name) {
    snapshots.updateMany(
        { 'snaps.userId': id },
        { $set: { 'snaps.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating name in snapshots: ' + e);
    });
}

export function updatelinkinprofile(id, link) {
    user.updateOne(
        { userId: id },
        { $set: { 'link': link } },
    ).catch(function (e) {
        console.log('Profile picture: ' + e);
    });
}

export function updatelinkinreviews(id, link) {
    stores.updateMany(
        { 'reviews.userId': id },
        { $set: { 'reviews.$[el].link': link } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating pic in reviews: ' + e);
    });
}

export function updatelinkincommends(id, link) {
    stores.updateMany(
        { 'commends.userId': id },
        { $set: { 'commends.$[el].link': link } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating link in commends: ' + e);
    });
}

export function updatelinkincomments(id, link) {
    post.updateMany(
        { 'comments.userId': id },
        { $set: { 'comments.$[el].link': link } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating link in comments: ' + e);
    });
}

export function updatelinkinlikes(id, link) {
    likes.updateMany(
        { 'likes.userId': id },
        { $set: { 'likes.$[el].link': link } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating link in likes: ' + e);
    });
}

export function updatelinkinfollowers(id, link) {
    followers.updateMany(
        { 'followers.userId': id },
        { $set: { 'followers.$[el].link': link } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating link in followers: ' + e);
    });
}

export function updatelinkinsearches(id, link) {
    searchhistory.updateMany(
        { 'users.userId': id },
        { $set: { 'users.$[el].link': link } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating link in searches: ' + e);
    });
}