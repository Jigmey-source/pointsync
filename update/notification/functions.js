import notifications from "../../models/notifications.js";

//TODO change functionname to pushnotification
export function addnotification(req) {
    notifications.updateOne(
        { userId: req.body.id },
        { $push: { notifications: req.body } },
        { upsert: true },
    ).catch(function (e) {
        console.log('Error adding new notification: ' + e);
    });
}

//TODO change functionname to pullnotification
export function updatenotifications(id, data) {
    notifications.updateOne(
        { userId: id },
        { $pull: { 'notifications': data } },
    ).catch(function (e) {
        console.log('Error deleting notification: ' + e);
    });
}

export function updateinnotifications(link, common) {
    notifications.updateMany(
        { mediaUrl: link },
        { $set: { mediaurl: common } },
    ).catch(function (e) {
        console.log('cant update image in notfications: ' + e);
    });
}