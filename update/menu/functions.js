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

export function setrateinmenu(link, rate) {
    console.log('show me the dollar: ' + rate);
    menus.updateOne(
        { 'menu.link': link },
        { $set: { 'menu.$[el].averagerate': rate } },
        { arrayFilters: [{ 'el.link': link }] },
    ).catch(function (e) {
        console.log('Error incrementing reviews in menu: ' + e);
    });
}