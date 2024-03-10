import history from "../../models/history.js";

export function deleteinhistory(id) {
    history.updateMany(
        { 'users.userId': id },
        { $pull: { 'users': { userId: id } } }
    ).then(function () {
        console.log('USER ELEMENT DELETED IN SEARCHHISTORY COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN SEARCHHISTORY COLLECTION: ' + e);
    });
}