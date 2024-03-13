import user from "../../models/user.js";
import followers from "../../models/followers.js";
import history from "../../models/history.js";

export function addfollowers(req) {
    followers.updateOne(
        { userId: req.body.id },
        { $push: { followers: req.body } },
        { upsert: true, new: true },
    ).catch(function (e) {
        console.log('Error adding follower: ' + e);
    });
}

export function pullfollowing(id, userId) {
    user.updateOne(
        { userId: userId },
        { $pull: { 'following': { userId: id } } },
    ).catch(function (e) {
        console.log('Error Unfollowing ' + e);
    });
}

export function incrementfollowers(id, i) {
    user.updateOne(
        { userId: id },
        { $inc: { 'totalfollowers': i } },
    ).catch(function (e) {
        console.log('Error updating followers increment: ' + e);
    });
}

export function incrementfollowing(id, i) {
    user.updateOne(
        { userId: id },
        { $inc: { 'totalfollowing': i } },
    ).catch(function (e) {
        console.log('Error updating totalfollowing increment: ' + e);
    });
}

export function newfollowers(id, userId) {
    followers.updateOne(
        { userId: id },
        { $pull: { 'followers': { userId: userId } } },
    ).catch(function (e) {
        console.log('Error Followers: ' + e);
    });
}

export function blockuser(id, userId) {
    user.updateOne(
        { userId: userId },
        { $push: { blocked: id } },
    ).catch(function (e) {
        console.log('Error blocking user: ' + id);
    });
}

export function removesearchhistory(id, userId) {
    history.updateOne(
        { userId: id },
        { $pull: { 'users': { userId: userId } } },
    ).catch(function (e) {
        console.log('Error removing from search history: ' + e);
    });
}

export function incrementposts(id, i) {
    user.updateOne(
        { userId: id },
        { $inc: { 'posts': i } },
    ).catch(function (e) {
        console.log('Error incrementing posts: ' + e);
    });
}