import records from "../../models/records.js";

//TODO change functionname to pushrecord
export function addrecord(locality, adminArea, data) {
    records.updateOne(
        { locality: locality, adminArea: adminArea },
        { $push: { records: data } },
        { upsert: true, new: true },
    ).catch(function (e) {
        console.log('Error adding record: ' + e);
    });
}

export function updateeventinrecords(link, event) {
    records.updateOne(
        { 'records.link': link },
        { $set: { 'records.$[el].event': event } },
        { arrayFilters: [{ 'el.link': link }] },
    ).catch(function (e) {
        console.log('Error UpdateEvent: ' + e);
    });
}

//TODO change functionname to pullrecord
export function deleterecord(link) {
    records.updateOne(
        { 'records.link': link },
        { $pull: { 'records': { link: link } } },
    ).catch(function (e) {
        console.log('Error deleting record: ' + e);
    });
}

export function deleteinlocality(id) {
    records.updateOne(
        { 'records.admin': id },
        { $pull: { 'records': { admin: id } } }
    ).then(function () {
        console.log('USER ELEMENT DELETED IN LOCALITY COLLECTION');
    }).catch(function (e) {
        console.log('ERROR DELETING USER ELEMENT IN LOCALITY COLLECTION: ' + e);
    });
}

export function updateinrecord(link, common) {
    records.updateOne(
        { 'records.link': link },
        { $set: { 'records.$[el].link': common } },
        { arrayFilters: [{ 'el.link': link }] },
    ).catch(function (e) {
        console.log('Error UpdateLink in record: ' + e);
    });
}

export function setrateinrecord(link, rate) {
    console.log('show me the dollar: ' + rate);
    records.updateOne(
        { 'records.link': link },
        { $set: { 'records.$[el].averagerate': rate } },
        { arrayFilters: [{ 'el.link': link }] },
    ).catch(function (e) {
        console.log('Error incrementing reviews in record: ' + e);
    })
}

export function incrementrecommendationsinrecord(link, i) {
    records.updateOne(
        { 'records.link': link },
        { $inc: { 'records.$[el].recommendations': i } },
        { arrayFilters: [{ 'el.link': link }] },
    ).catch(function (e) {
        console.log('Error incrementing recommendations in record: ' + e);
    });
}