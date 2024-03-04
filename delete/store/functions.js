import catalogues from "../../models/catalogues";
import stores from "../../models/store";

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
