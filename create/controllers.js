import post from "../models/post.js";
import reports from "../models/reports.js";
import DataStructure from "./data_structure.js";
import { myfollowers } from "../read/followers/functions.js";
import { incrementposts } from "../update/user/functions.js";
import { addnotification } from "../update/notification/functions.js";
import { addmenu, addstore } from "./store/functions.js";
import { calculateaveragerate } from "../read/store/functions.js";
import { getToken, buildnotification } from "./notification/functions.js";
import { deleteinfeeds, publishtofeeds } from "../update/feeds/functions.js";
import { incrementrecommendationsinmenu } from "../update/menu/functions.js";
import { addrecord, setrateinrecord, incrementrecommendationsinrecord } from "../update/record/functions.js";
import {
    savesnapshot, incrementcomments,
    incrementlikes, saveicon, addlike, addcomment
} from "../update/post/functions.js";
import {
    addrecommendation, addreview,
    incrementrecommendationsinstore, incrementreviewinstore
} from "../update/store/functions.js";

const datastructure = new DataStructure();

export const notification = async (req, res) => {
    try {
        const token = await getToken(req.body.id);
        addnotification(req);
        buildnotification(req, token);
        res.json('Success');
    } catch (e) {
        console.log('What is the error getTOKEN: ' + e);
        res.json(e);
    }
}

export const icon = async (req, res) => {
    const newpost = new post(req.body);
    const data = datastructure.icon(newpost);

    try {
        savesnapshot(req.body.userId, data);
        incrementposts(req.body.userId, 1);
        const follower = await myfollowers(req.body.userId);
        console.log('FOLLOWER FOLLOWER FOLLOWER FOLLOWER: ' + follower);
        publishtofeeds(req.body.userId, follower, data);
        saveicon(req.body.locality, req.body.adminArea, data);
        await newpost.save();
        res.json('icon successfully added');
    } catch (e) {
        const response = { message: 'Error adding new post: ' + e }
        res.json(response);
    }
}

export const snapshot = async (req, res) => {
    console.log('INSIDE SNAPSHOT METHOD');
    const newpost = new post(req.body);
    const data = datastructure.snapshot(newpost);

    try {
        savesnapshot(req.body.userId, data);
        incrementposts(req.body.userId, 1);
        const follower = await myfollowers(req.body.userId);
        console.log('FOLLOWER FOLLOWER FOLLOWER FOLLOWER: ' + follower);
        publishtofeeds(req.body.userId, follower, data);
        await newpost.save();
        res.json({ success: true });
    } catch (e) {
        const response = { message: 'Error adding new post: ' + e }
        res.json(response);
    }
}

export const like = async (req, res) => {
    const data = datastructure.like(req);
    try {
        addlike(req.body.common, data);
        incrementlikes(req.body.common, 1);
        res.json('Successfully added like');
    } catch (e) {
        res.json(e);
    }
}

export const comment = async (req, res) => {
    const comment = datastructure.comment(req);
    try {
        addcomment(req.body.common, comment);
        incrementcomments(req.body.common, 1);
        res.json(comment);
    } catch (e) {
        console.log('Error Addcomment: ' + e);
        res.json(e);
    }
}

export const report = async (req, res) => {
    const report = new reports(req.body);
    try {
        await report.save();
        deleteinfeeds(req.body.id, req.body.link);
        res.json('SUCCESS');
    } catch (e) {
        console.log('Error Reports: ' + e);
        res.json(e);
    }
}

export const recommend = async (req, res) => {
    console.log('inside recommend asdfasdfasdfasdf');
    console.log(req.body);
    console.log(req.body.common);
    const data = datastructure.recommend(req);
    try {
        addrecommendation(req.body.common, data);
        incrementrecommendationsinstore(req.body.common, 1);
        incrementrecommendationsinrecord(req.body.common, 1);
        incrementrecommendationsinmenu(req.body.common, 1);
        res.json('Recommendation added');
    } catch (e) {
        console.log('Error recommending: ' + e);
        res.json(e);
    }
}

export const review = async (req, res) => {
    console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
    console.log(req.body);
    const review = datastructure.review(req);
    try {
        await addreview(req.body.common, review);
        const rate = await calculateaveragerate(req.body.common);
        incrementreviewinstore(req.body.common, rate, 1);
        setrateinrecord(req.body.common, rate);
        res.json(review);
    } catch (e) {
        console.log('Error addingreview: ' + e);
        res.json(e);
    }
}

export const inventory = async (req, res) => {
    const data = datastructure.inventory(req);
    try {
        addrecord(req.body.locality, req.body.adminArea, data);
        addstore(req);
        addmenu(req.body.common, data);
        res.json('New record added! ' + req.body.title);
    } catch (e) {
        res.json(e);
    }
}

export const store = async (req, res) => {
    const data = datastructure.add(req);
    try {
        addrecord(req.body.locality, req.body.adminArea, data);
        addstore(req);
        res.json('New record added! ' + req.body.title);
    } catch (e) {
        console.log('Error adding record : ' + e);
        res.json(e);
    }
}