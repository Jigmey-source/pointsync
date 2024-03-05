import followers from "../../models/followers.js";
export async function myfollowers(id) {
    console.log('INSIDE MYFOLLOWERS METHOD');
    console.log(id);
    const follower = await followers.aggregate([
        { $match: { userId: id } },
        { $unwind: '$followers' },
        { $replaceRoot: { newRoot: '$followers' } }
    ], function (e, doc) {
        if (e) {
            console.log('fffffuck ' + e);
        } else {
            console.log('dock me ' + doc);
            return doc;
        }
    });
    return follower;
}
