import notifications from "../../models/notifications.js";

export const notification = async (req, res) => { 
    notifications.updateMany(
        { userId: req.body.id },
        { $set: { 'notifications.$[el].seen': true } },
        { arrayFilters: [{ 'el.userId': req.body.userId, 'el.type': req.body.type }] },
        function (e, doc) {
            if (e) {
                console.log('Error setting seen: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
}