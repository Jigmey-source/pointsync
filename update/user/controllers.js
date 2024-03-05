import user from "../../models/user.js";
import {
    addfollowers, pullfollowing, newfollowers, incrementfollowing,
    incrementfollowers, blockuser, removesearchhistory 
} from "./functions.js";
import {
    updatenameinprofile, updatenameinposts, updatenameinfeeds,
    updatenameinreviews, updatenameincommends, updatenameincomments,
    updatenameinlikes, updatenameinicons, updatenameinfollowers,
    updatenameinsearches, updatenameinsnapshots, updatelinkinprofile,
    updatelinkinreviews, updatelinkincommends, updatelinkincomments,
    updatelinkinlikes, updatelinkinfollowers, updatelinkinsearches
} from "./updatemany/functions.js";

export const token = async (req, res) => {
    user.updateOne(
        { userId: req.body.userId },
        { $set: { token: req.body.token } },
        function (e, doc) {
            if (e) {
                console.log('Error saving token: ' + e);
                res.json(e);
            } else {
                console.log('token successfully saved');
                res.json(doc);
            }
        }
    );
}

export const alternatetoken = async (req, res) => {
    const data = {
        online: false,
        locality: req.body.locality,
        adminArea: req.body.adminArea,
        country: req.body.country,
        lat: req.body.lat,
        lng: req.body.lng,
    }
    user.updateOne(
        { userId: req.body.userId },
        { $set: { token: req.body.token, placemarker: data } },
        function (e, doc) {
            if (e) {
                console.log('Error altering user: ' + e);
                res.json(e);
            } else {
                console.log('User altered successfully');
                res.json(doc);
            }
        }
    );
}

export const relocation = async (req, res) => {
    const data = {
        online: false,
        country: req.body.country,
        locality: req.body.locality,
        adminArea: req.body.adminArea,
        lat: req.body.lat,
        lng: req.body.lng,
    }

    user.updateOne(
        { userId: req.body.userId },
        { $set: { placemarker: data } },
        function (e, doc) {
            if (e) {
                console.log('Error relocating user: ' + e);
                res.json(e);
            } else {
                console.log('User relocated successfully');
                res.json(doc);
            }
        }
    );
}

export const follow = async (req, res) => {
    const data = {
        userId: req.body.userId,
        name: req.body.name,
        link: req.body.link,
    };

    user.updateOne(
        { userId: req.body.id },
        { $set: { 'following': data }, $inc: { 'totalfollowing': 1 } },
        function (e, doc) {
            if (e) {
                console.log('Error following :' + e);
                res.json(e);
            } else {
                console.log('Following Updated: ' + doc);
                res.json(doc);
            }
        }
    );
}

export const followee = async (req, res) => {
    try {
        addfollowers(req);
        incrementfollowers(req.body.id, 1);
        res.json({ success: true });
    } catch (e) {
        console.log('Error adding new follower: ' + e);
        res.json(e);
    }
}

export const unfollow = async (req, res) => {
    try {
        pullfollowing(req.body.id, req.body.userId);
        newfollowers(req.body.id, req.body.userId);
        incrementfollowing(req.body.userId, -1);
        incrementfollowers(req.body.id, -1);
        resjson({ success: true });
    } catch (e) {
        res.json(e);
    }
}

export const enablelocation = async (req, res) => {
    const data = {
        online: true,
        country: req.body.country,
        locality: req.body.locality,
        adminArea: req.body.adminArea,
        lat: req.body.lat,
        lng: req.body.lng,
    };

    console.log(req.body);

    user.updateOne(
        { userId: req.body.userId },
        { $set: { placemarker: data } },
        function (e, doc) {
            if (e) {
                console.log('Error enabling location: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
}

export const disablelocation = async (req, res) => {
    user.updateOne(
        { userId: req.body.userId },
        { $set: { 'placemarker.online': false } },
        function (e, doc) {
            if (e) {
                console.log('Error disabling location: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
}

export const work = async (req, res) => {
    const data = {
        title: req.body.title,
        type: req.body.type,
        link: req.body.link,
    };

    try {
        const entry = await user.findOne({ userId: req.body.userId });
        entry.work.push(data);
        await entry.save();
        const response = { message: "Work added! " + req.body.title }
        res.json(response);
    } catch (e) {
        const response = { message: 'Error adding to work: ' + e };
        res.json(response);
    }
}

export const block = async (req, res) => {
    try {
        blockuser(req.body.id, req.body.userId);
        removesearchhistory(req.body.id, req.body.userId);
        pullfollowing(req.body.id, req.body.userId);
        newfollowers(req.body.id, req.body.userId);
        newfollowers(req.body.userId, req.body.id);
        res.json('successfully blocked');
    } catch (e) {
        res.json(e);
    }
}

export const unblock = async (req, res) => {
    user.updateOne(
        { userId: req.body.userId },
        { $pull: { blocked: req.body.id } },
        function (e, doc) {
            if (e) {
                console.log('Error unblocking user: ' + req.body.id);
                res.json(e);
            } else {
                console.log('Successfully unblocked user: ' + req.body.id);
                res.json(doc);
            }
        }
    );
}

export const hide = async (req, res) => {
    user.updateOne(
        { userId: req.body.userId },
        { $push: { hidefrom: req.body.group } },
        function (e, doc) {
            if (e) {
                console.log('Error hiding :' + req.body.group);
                res.json(e);
            } else {
                console.log('Successfully hidden from: ' + req.body.group);
                res.json(doc);
            }
        }
    );
}

export const display = async (req, res) => {
    user.updateOne(
        { userId: req.body.userId },
        { $pull: { hidefrom: req.body.group } },
        function (e, doc) {
            if (e) {
                console.log('Error hiding group: ' + req.body.group);
                res.json(e);
            } else {
                console.log('Successfully hidden group: ' + req.body.group);
                res.json(doc);
            }
        }
    );
}

export const bio = async (req, res) => {
    user.findOneAndUpdate(
        { userId: req.body.userId },
        { $set: { 'description': req.body.description } },
        function (e, doc) {
            if (e) {
                console.log('Error updating description: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
}

export const group = async (req, res) => { 
    user.findOneAndUpdate(
        { userId: req.body.userId },
        { $set: { 'group': req.body.group, 'placemarker.online': false } },
        function (e, doc) {
            if (e) {
                console.log('New Group: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
}

export const name = async (req, res) => { 
    try {
        updatenameinprofile(req.body.userId, req.body.name);
        updatenameinposts(req.body.userId, req.body.name);
        updatenameinfeeds(req.body.userId, req.body.name);
        updatenameinreviews(req.body.userId, req.body.name);
        updatenameincommends(req.body.userId, req.body.name);
        updatenameincomments(req.body.userId, req.body.name);
        updatenameinlikes(req.body.userId, req.body.name);
        updatenameinicons(req.body.userId, req.body.name);
        updatenameinfollowers(req.body.userId, req.body.name);
        updatenameinsearches(req.body.userId, req.body.name);
        updatenameinsnapshots(req.body.userId, req.body.name);
        res.json('Updated name everywhere');
    } catch (e) {
        res.json(e);
    }
}

export const profilepicture = async (req, res) => { 
    try {
        updatelinkinprofile(req.body.userId, req.body.link);
        updatelinkinreviews(req.body.userId, req.body.link);
        updatelinkincommends(req.body.userId, req.body.link);
        updatelinkincomments(req.body.userId, req.body.link);
        updatelinkinlikes(req.body.userId, req.body.link);
        updatelinkinfollowers(req.body.userId, req.body.link);
        updatelinkinsearches(req.body.userId, req.body.link);
        res.json('Updated link everywhere');
    } catch (e) {
        res.json(e);
    }
}