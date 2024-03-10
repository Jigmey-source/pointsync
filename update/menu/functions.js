import menus from "../../models/menus.js";

export function incrementrecommendationsinmenu(link, i) {
    menus.updateOne(
        { 'menus.link': link },
        { $inc: { 'menus.$[el].recommendations': i } },
        { arrayFilters: [{ 'el.link': link }] },
    ).catch(function (e) {
        console.log('Error incrementing recommendations in menu: ' + e);
    });
}