import {
    updatepostdescription, updatesnapdescription,
    updateicondescription, updatedescriptioninfeeds
} from "./functions.js";

export const postdescription = async (req, res) => {
    try {
        updatepostdescription(req.body.link, req.body.description);
        updatesnapdescription(req.body.link, req.body.description);
        updateicondescription(req.body.link, req.body.description);
        updatedescriptioninfeeds(req.body.link, req.body.description);
        res.json('updated post description in post and feeds');
    } catch (e) {
        res.json(e);
    }
}