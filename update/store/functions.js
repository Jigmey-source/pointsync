import records from "../../models/records";
import stores from "../../models/store";
import notifications from "../../models/notifications";

export function deleteinreviews(id) {
    stores.updateMany(
        { 'reviews.userId': id },
        { $pull: { 'reviews': { userId: id } } }
    ).then(function () {
        console.log('USER ELEMENT DELETED IN REVIEWS SUB-COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN REVIEWS SUB-COLLECTION: ' + e);
    });
}

export function deleteincommends(id) {
    stores.updateMany(
        { 'commends.userId': id },
        { $pull: { 'commends': { userId: id } } }
    ).then(function () {
        console.log('USER ELEMENT DELETED IN COMMENDS SUB-COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN COMMENDS SUB-COLLECTION: ' + e);
    });
}

export function addrecommendation(link, data) {
    stores.updateOne(
        { link: link },
        { $push: { commends: data } },
    ).catch(function (e) {
        console.log('Error adding recommendation: ' + e);
    });
}

export async function addreview(link, review) {
    await stores.updateOne(
        { link: link },
        { $push: { reviews: review } },
    );
}

export function updatestore(link, admin) {
    stores.updateOne(
        { link: link },
        { $set: { admin: admin } },
        { upsert: true },
    ).catch(function (e) {
        console.log('Error Admin: ' + e);
    });
};

//TODO change functionanme tp pullcommends
export function deleterecommendation(id, link) {
    stores.updateOne(
        { link: link },
        { $pull: { 'commends': { userId: id } } },
    ).catch(function (e) {
        console.log('Error decrementing: ' + e);
    });
}

//TODO change functionname to pullreviews
export async function deletereview(id, link, review) {
    await stores.findOneAndUpdate(
        { link: link },
        { $pull: { 'reviews': { userId: id, review: review } } }
    )
}

//TODO probably do updateItems
export function updatestores(link, admin) {
    stores.updateMany(
        { parent: link },
        { $set: { admin: admin } },
    ).catch(function (e) {
        console.log('Error setting admin to stores: ' + e);
    })
};

export function updateeventinstore(link, event) {
    stores.updateOne(
        { link: link },
        { $set: { event: event } },
    ).catch(function (e) {
        console.log('Error UpdateEvent: ' + e);
    });
}

export function updateinstore(link, common) {
    stores.updateOne(
        { link: link },
        { $set: { link: common } },
    ).catch(function (e) {
        console.log('Error UpdateLink in store: ' + e);
    });
}

export function updateinchildstores(link, common) {
    stores.updateMany(
        { parent: link },
        { $set: { parent: common } },
    ).catch(function (e) {
        console.log('Error UpdateLink in store: ' + e);
    });
}

///used in create/store/route.js
export function incrementrecommendationsinstore(link, i) {
    stores.updateOne(
        { link: link },
        { $inc: { 'recommendations': i } },
    ).catch(function (e) {
        console.log('Error incrementing recommendations in store: ' + e);
    });
}

export function incrementreviewinstore(link, rate, i) {
    console.log('show me the money: ' + rate);
    stores.updateOne(
        { link: link },
        { $set: { 'averagerate': rate, $inc: { 'totalreviews': i } } },
    ).catch(function (e) {
        console.log('Error incrementing reviews in store: ' + e);
    });
}