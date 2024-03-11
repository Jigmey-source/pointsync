import menus from "../../models/menus.js";
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

export function deletemenu(link) {
    menus.updateOne(
        { 'menu.link': link },
        { $pull: { 'menu': { link: link } } },
    ).catch(function (e) {
        console.log('Error deleting menu: ' + e);
    });
}
