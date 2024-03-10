import stores from "../../models/store.js";
import menus from "../../models/menus.js";

export function addstore(req) {
    const add = new stores(req.body);
    add.save();
}

export function addmenu(link, data) {
    menus.updateOne(
        { link: link },
        { $push: { menu: data } },
        { upsert: true, new: true },
    ).catch(function (e) {
        console.log('Error adding menu: ' + e);
    });
}
