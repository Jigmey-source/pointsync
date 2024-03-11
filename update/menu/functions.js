import menus from "../../models/menus.js";

export function incrementrecommendationsinmenu(link, i) {
    menus.updateOne(
        { 'menu.link': link },
        { $inc: { 'menu.$[el].recommendations': i } },
        { arrayFilters: [{ 'el.link': link }] },
    ).catch(function (e) {
        console.log('Error incrementing recommendations in menu: ' + e);
    });
}