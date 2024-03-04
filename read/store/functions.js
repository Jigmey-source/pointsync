import stores from "../../models/store";

export async function calculateaveragerate(common) {
    var rate;
    const doc = await stores.aggregate([
        { $match: { link: common } },
        { $unwind: '$reviews' },
        { $replaceRoot: { newRoot: '$reviews' } },
        { $group: { _id: null, averagerate: { $avg: '$rate' } } }
    ]).then(function (doc) {
        return doc;
    }).catch(function (e) {
        console.log('ERROR SETTING AVERAGE: ' + e);
    });
    doc.forEach(function (s) { rate = s['averagerate']; });
    return rate ?? 0;
}