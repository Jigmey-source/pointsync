import stores from "../../models/store";
import catalogues from "../../models/catalogues";

export function addstore(req) {
    const add = new stores(req.body);
    add.save();
}

export function addcatalogue(link, data) {
    catalogues.updateOne(
        { link: link },
        { $push: { catalogue: data } },
        { upsert: true, new: true },
    ).catch(function (e) {
        console.log('Error adding catalogue: ' + e);
    });
}
