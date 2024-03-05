import reports from "../../models/reports.js";

export const getreports = async (req, res) => { 
    const page = req.query.get || 0;
    const perPage = 20;
    reports.find()
        .sort({ timestamp: -1 })
        .skip(page * perPage)
        .limit(perPage)
        .then(function (doc) {
            console.log('GETTING REPORTS');
            console.log(doc);
            res.json(doc);
        }).catch(function (e) {
            res.json('ERROR GETTING REPORTS: ' + e);
        });
}