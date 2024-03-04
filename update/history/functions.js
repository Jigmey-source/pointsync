import searchhistory from "../../models/search_history";

export function deleteinhistory(id) {
    searchhistory.updateMany(
        { 'users.userId': id },
        { $pull: { 'users': { userId: id } } }
    ).then(function () {
        console.log('USER ELEMENT DELETED IN SEARCHHISTORY COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN SEARCHHISTORY COLLECTION: ' + e);
    });
}