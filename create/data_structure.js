export class DataStructure {
    icon(newpost) {
        var data = {
            lat: newpost.lat,
            lng: newpost.lng,
            type: newpost.type,
            name: newpost.name,
            link: newpost.link,
            userId: newpost.userId,
            description: newpost.description,
        };
        return data;
    }

    snapshot(newpost) {
        var data = {
            name: newpost.name,
            link: newpost.link,
            userId: newpost.userId,
            description: newpost.description,
        };
        return data;
    }

    like(req) {
        var data = {
            link: req.body.link,
            name: req.body.name,
            userId: req.body.userId,
        };
        return data;
    }

    comment(req) {
        var data = {
            comment: req.body.comment,
            userId: req.body.userId,
            link: req.body.link,
            name: req.body.name,
        };
        return data;
    }

    recommend(req) {
        var data = {
            userId: req.body.userId,
            name: req.body.name,
            link: req.body.link
        };
        return data;
    }

    review(req) {
        var data = {
            name: req.body.name,
            link: req.body.link,
            rate: req.body.rate,
            userId: req.body.userId,
            review: req.body.review,
        };
        return data;
    }

    inventory(req) {
        var data = {
            admin: req.body.userId,
            event: req.body.event,
            type: req.body.type,
            title: req.body.title,
            link: req.body.link,
            averagerate: req.body.averagerate,
            recommendations: req.body.recommendations,
        };
        return data;
    }

    add(req) {
        var data = {
            admin: req.body.userId,
            point: req.body.point,
            event: req.body.event,
            type: req.body.type,
            title: req.body.title,
            link: req.body.link,
            average_rate: req.body.average_rate,
            recommendations: req.body.recommendations,
        };
        return data;
    }
}

export default DataStructure;