import searchhistory from "../../models/search_history.js";

export const userhistory = async (req, res) => {
    searchhistory.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$users' },
        { $replaceRoot: { newRoot: '$users' } },
        { $sort: { 'timestamp': -1 } }
    ], function (e, doc) {
        if (e) {
            res.json(e)
        } else {
            res.json(doc);
        }
    });
}

export const placehistory = async (req, res) => { 
    searchhistory.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$places' },
        { $replaceRoot: { newRoot: '$places' } },
        { $sort: { 'timestamp': -1 } }
    ], function (e, doc) {
        if (e) {
            res.json(e)
        } else {
            res.json(doc);
        }
    });
}