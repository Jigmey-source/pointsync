import user from "../../models/user";
import followers from "../../models/followers";


export const currentlocation = async (req, res) => {
    user.findOne(
        { userId: req.body.userId },
        function (e, doc) {
            if (e) {
                console.log('ERROR GETTING PLACEMARKER: ' + e);
                res.json(e);
            } else {
                console.log('PLACEMARKER: ' + doc);
                res.json(doc['placemarker']);
            }
        }).select('placemarker -_id');
}

export const user = async (req, res) => {
    user.findOne(
        { userId: req.body.userId },
        function (e, doc) {
            if (e) {
                console.log('Error getting User: ' + e);
                res.json(e);
            } else {
                console.log('doc docdc dcodocodc: ' + doc);
                res.json(doc);
            }
        });
}

export const following = async (req, res) => {
    const page = req.query.get || 0;
    const perPage = 20;
    user.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$following' },
        { $replaceRoot: { newRoot: '$following' } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            console.log('Error getting following: ' + e);
            res.send(500, e);
        } else {
            console.log(doc);
            res.json(doc);
        }
    });
}

export const followers = async (req, res) => {
    console.log('inside following peopple');
    console.log(req.body);
    const page = req.query.get || 0;
    const perPage = 20;
    followers.aggregate([
        { $match: { userId: req.body.userId } },
        { $unwind: '$followers' },
        { $replaceRoot: { newRoot: '$followers' } },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            console.log('Error getting following: ' + e);
            res.send(500, e);
        } else {
            console.log(doc);
            res.json(doc);
        }
    });
}

export const hidefrom = async (req, res) => {
    user.find(
        { userId: req.body.userId }
    ).distinct('hidefrom', function (e, doc) {
        if (e) {
            console.log('Error getting hidefrom: ' + e);
            res.json(e);
        } else {
            console.log('hidefrom doc: ' + doc);
            res.json(doc);
        }
    });
}

export const onlinepeople = async (req, res) => {
    user.find(
        {
            'placemarker.locality': req.body.locality,
            'placemarker.adminArea': req.body.adminArea,
            'placemarker.online': true,
        }
    ).distinct('group', function (e, doc) {
        if (e) {
            console.log('eeeeeeee' + e);
            res.json(e);
        } else {
            console.log(doc);
            res.json(doc);
        }
    });
}

export const online = async (req, res) => {
    const page = req.query.get || 0;
    const perPage = 20;
    user.aggregate([
        {
            $match: {
                group: req.body.group,
                'placemarker.locality': req.body.locality,
                'placemarker.adminArea': req.body.adminArea,
                'placemarker.online': true,
            }
        },
        { $skip: (page * perPage) },
        { $limit: perPage },
    ], function (e, doc) {
        if (e) {
            console.log('asdlk;fjasdfasdfsd: ' + e);
            res.send(500, e);
        } else {
            console.log(doc);
            res.json(doc);
        }
    });
}

export const newusers = async (req, res) => { 
    user.aggregate([
        { $match: { name: { $regex: '^' + req.body.searchKey, $options: 'i' } } }
    ], function (e, doc) {
        if (e) {
            res.json(e);
        } else {
            res.json(doc);
        }
    });
}