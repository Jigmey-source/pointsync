import catalogues from "../../models/catalogues.js";
import stores from "../../models/store.js";

export function deletestore(link) {
    stores.deleteOne({
        link: link
    }).then(function () {
        console.log('Store has been deleted');
    }).catch(function (e) {
        console.log('Error deleting store: ' + e);
    });
}

export function deletecatalogue(link) {
    catalogues.deleteOne({
        link: link
    }).then(function () {
        console.log('Deleting catalogue successful');
    }).catch(function (e) {
        console.log('Error deleting catalogue: ' + e);
    });
}
