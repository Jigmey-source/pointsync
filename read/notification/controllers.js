import notification from "../../models/notifications.js";

export const newnotifications = async (req, res) => { 
    notification.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$notifications' },
        { $replaceRoot: { newRoot: '$notifications' } },
        { $match: { seen: false } },
        { $limit: 1 },
    ], function (e, doc) {
        if (e) {
            console.log('ERROR CHECKING NOTIFICATION: ' + e);
            res.json(e);
        } else {
            console.log('NOTIFICATIONS: ' + doc);
            res.json(doc);
        }
    });
}

export const notifications = async (req, res) => { 
    const page = req.query.get || 0;
    const perPage = 20;
    notification.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$notifications' },
        { $replaceRoot: { newRoot: '$notifications' } },
        { $sort: { 'timestamp': -1 } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            console.log('Error getting notifications: ' + e);
            res.json(e);
        } else {
            console.log('NOTIFICATIONS: ' + doc);
            res.json(doc);
        }
    });
}