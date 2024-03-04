import feeds from "../../models/feeds";

export function deleteinfeeds(id, link) {
    feeds.updateOne(
        { userId: id },
        { $pull: { 'feeds': { link: link } } },
    ).then(function (doc) {
        console.log('FEEDS HAVE BEEN UPDATED');
    }).catch(function (e) {
        console.log('ERROR UPDATING IN FEEDS: ' + e);
    });
};

export function pullmanyinfeeds(link) { 
    feeds.updateMany(
        { 'feeds.link': link },
        { $pull: { 'feeds': { link: link } } },
    ).catch(function (e) {
        console.log('Error deleting post in feeds: ' + e);
    });
}

export function publishtofeeds(id, follower, data) {
    const ids = follower.map(follower => follower.userId);
    ids.forEach(function (e) {
        console.log(e);
        feeds.updateMany(
            { userId: e },
            { $push: { feeds: data } },
            { upsert: true, new: true },
        ).then(function () {
            console.log('published to feeds yeehaa ' + e);
        }).catch(function (e) {
            console.log('what u think bitch! ' + e);
        });
    });
}