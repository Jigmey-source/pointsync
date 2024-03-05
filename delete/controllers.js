import reports from "../models/reports.js";
import notifications from "../models/notifications.js";
import { deletePost } from "./post/functions.js";
import { datastructure } from "./notification/functions.js";
import { updatenotifications } from "../update/notification/functions.js";
import { incrementposts } from "../update/user/functions.js";
import { pullmanyinfeeds } from "../update/feeds/functions.js";
import {
    deletecomment, undolike, incrementcomments,
    incrementlikes, deleteinsnapshots, deleteinicons
} from "../update/post/functions.js";
import { deletestore, deletecatalogue } from "./store/functions.js";
import { deleterecord, setrateinrecord, incrementrecommendationsinrecord } from "../update/record/functions.js";
import { calculateaveragerate } from "../read/store/functions.js";
import { deletereview, deleterecommendation } from "../update/store/functions.js";
import {
    deletereview, deleterecommendation,
    incrementrecommendationsinstore, incrementreviewinstore
} from "../update/store/functions.js";

export const notification = async (req, res) => {
    notifications.updateOne(
        { userId: req.body.id },
        { $pull: { 'notifications': { type: req.body.type, userId: req.body.userId } } },
        function (e, result) {
            if (e) {
                console.log('Error deleting notification: ' + e);
                res.json(e);
            } else {
                console.log('Successfully deleted notification');
                res.json(result);
            }
        }
    );
}

export const specificnotification = async (req, res) => {
    var data = datastructure(req);
    try {
        updatenotifications(req.body.id, data);
        res.json(data);
    } catch (e) {
        console.log('ERROR DELETING SPECIFIC NOTIFICATION: ' + e);
        res.json(e);
    }
}

export const post = async (req, res) => {
    try {
        deletePost(req.body.link);
        incrementposts(req.body.userId, -1);
        deleteinsnapshots(req.body.link);
        pullmanyinfeeds(req.body.link);
        deleteinicons(req.body.link);
        res.json('Successfully deleted Post');
    } catch (e) {
        console.log('Error deleting post: ' + e);
        res.json(e);
    }
}

export const comment = async (req, res) => {
    try {
        deletecomment(req.body.userId, req.body.link, req.body.comment);
        incrementcomments(req.body.link, -1);
        res.json('Successfully added comment');
    } catch (e) {
        res.json(e);
    }
}

export const like = async (req, res) => {
    try {
        undolike(req.body.userId, req.body.link);
        incrementlikes(req.body.link, -1);
        res.json('Successfully added likes');
    } catch (e) {
        res.json(e);
    }
}

export const report = async (req, res) => {
    reports.deleteOne({
        _id: req.body.id
    }).then(function () {
        console.log('Report has been deleted');
    }).catch(function (e) {
        console.log('Error deleting report: ' + e);
    });
}

export const item = async (req, res) => {
    try {
        deletestore(req.body.link);
        deleterecord(req.body.link);
        deletecatalogue(req.body.link);
        res.json();
    } catch (e) {
        console.log('delete record error: ' + e);
        res.json(e);
    }
}

export const recommendation = async (req, res) => {
    try {
        deleterecommendation(req.body.userId, req.body.link);
        incrementrecommendationsinstore(req.body.link, -1);
        incrementrecommendationsinrecord(req.body.link, -1);
        res.json('Successfully decremented');
    } catch (e) {
        console.log('Error decrementing: ' + e);
        res.json(e);
    }
}

export const review = async (req, res) => {
    try {
        await deletereview(req.body.userId, req.body.link, req.body.review);
        const rate = await calculateaveragerate(req.body.link);
        incrementreviewinstore(req.body.link, rate, -1);
        setrateinrecord(req.body.link, rate);
        res.json('successfully deleted reviews');
    } catch (e) {
        res.json(e);
    }
}