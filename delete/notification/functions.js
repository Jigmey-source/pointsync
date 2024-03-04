export function datastructure(req) {
    var data = { mediaurl: req.body.link, userId: req.body.userId }
    if (req.body.comment != null) {
        data.comment = req.body.comment
    } else if (req.body.review != null) {
        data.review = req.body.review
    } else {
        data.type = req.body.type
    }
    return data;
}
