import { Router } from 'express';
const router = Router();

import user from '../models/user.js';
import post from '../models/post.js';
import icons from '../models/icons.js';
import likes from '../models/likes.js';
import feeds from '../models/feeds.js';
import stores from '../models/store.js';
import followers from '../models/followers.js';
import snapshots from '../models/snapshots.js';
import searches from '../models/search_history.js';
import records from '../models/records.js';
import Route from '../const/route.js';

const routes = new Route();

router.post(routes.updatename, async function (req, res) {
    // user.findOneAndUpdate(
    //     { userId: req.body.userId },
    //     { $set: { 'name': req.body.name } },
    //     function (e, doc) {
    //         if (e) {
    //             console.log('Error updating name: ' + e);
    //             res.json(e);
    //         } else {
    //             res.json(doc);
    //         }
    //     }
    // )

    try {
        updatenameinprofile(req.body.userId, req.body.name);
        updatenameinfeeds(req.body.userId, req.body.name);
        updatenameinreviews(req.body.userId, req.body.name);
        updatenameincommends(req.body.userId, req.body.name);
        updatenameincomments(req.body.userId, req.body.name);
        updatenameinlikes(req.body.userId, req.body.name);
        updatenameinicons(req.body.userId, req.body.name);
        updatenameinfollowers(req.body.userId, req.body.name);
        updatenameinposts(req.body.userId, req.body.name);
        updatenameinsearches(req.body.userId, req.body.name);
        updatenameinsnapshots(req.body.userId, req.body.name);
        res.json('Updated name everywhere');
    } catch (e) {
        res.json(e);
    }

});

function updatenameinprofile(id, name) {
    user.findOneAndUpdate(
        { userId: id },
        { $set: { 'name': name } },
        function (e, doc) {
            if (e) {
                console.log('Error updating name: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
}

function updatenameinfeeds(id, name) {
    feeds.updateOne(
        { 'snaps.userId': id },
        { $set: { 'snaps.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
        function (e, doc) {
            if (e) {
                console.log('Error updating name in feeds: ' + e);
            } else {
                console.log('Name updated in feeds');
            }
        }
    )
}

function updatenameinreviews(id, name) {
    stores.updateOne(
        { 'reviews.userId': id },
        { $set: { 'reviews.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
        function (e, doc) {
            if (e) {
                console.log('Error updating name in reviews: ' + e);
            } else {
                console.log('Name updated in reviews');
            }
        }
    )
}

function updatenameincommends(id, name) {
    stores.updateOne(
        { 'commends.userId': id },
        { $set: { 'commends.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
        function (e, doc) {
            if (e) {
                console.log('Error updating name in commends: ' + e);
            } else {
                console.log('Name updated in commends');
            }
        }
    )
}

function updatenameincomments(id, name) {
    post.updateOne(
        { 'comments.userId': id },
        { $set: { 'comments.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
        function (e, doc) {
            if (e) {
                console.log('Error updating name in comments: ' + e);
            } else {
                console.log('Name updated in posts');
            }
        }
    )
}

function updatenameinlikes(id, name) {
    likes.updateOne(
        { 'likes.userId': id },
        { $set: { 'likes.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
        function (e, doc) {
            if (e) {
                console.log('Error updating name in likes: ' + e);
            } else {
                console.log('Name updated in Likes');
            }
        }
    )
}

function updatenameinicons(id, name) {
    icons.updateOne(
        { 'snaps.userId': id },
        { $set: { 'snaps.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
        function (e, doc) {
            if (e) {
                console.log('Error updating name in icons: ' + e);
            } else {
                console.log('Name updated in Icons');
            }
        }
    )
}

function updatenameinfollowers(id, name) {
    followers.updateOne(
        { 'followers.userId': id },
        { $set: { 'followers.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
        function (e, doc) {
            if (e) {
                console.log('Error updating name in followers: ' + e);
            } else {
                console.log('Name updated in followers');
            }
        }
    )
}

function updatenameinposts(id, name) {
    post.updateOne(
        { userId: id },
        { $set: { name: name } },
        function (e, doc) {
            if (e) {
                console.log('Error updating name in feeds: ' + e);
            } else {
                console.log('Name updated in feeds');
            }
        }
    )
}

function updatenameinsearches(id, name) {
    searches.updateOne(
        { 'users.userId': id },
        { $set: { 'users.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
        function (e, doc) {
            if (e) {
                console.log('Error updating name in searches: ' + e);
            } else {
                console.log('Name updated in searches');
            }
        }
    )
}

function updatenameinsnapshots(id, name) {
    snapshots.updateOne(
        { 'snaps.userId': id },
        { $set: { 'snaps.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
        function (e, doc) {
            if (e) {
                console.log('Error updating name in snapshots: ' + e);
            } else {
                console.log('Name updated in snapshots');
            }
        }
    )
}

router.post(routes.updateprofilepicture, async function (req, res) {
    // user.findOneAndUpdate(
    //     { userId: req.body.userId },
    //     { $set: { 'link': req.body.link } },
    //     function (e, doc) {
    //         if (e) {
    //             console.log('Profile picture: ' + e);
    //             res.json(e);
    //         } else {
    //             res.json(doc);
    //         }
    //     }
    // );
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
});

function updatelinkinprofile(id, link) {
    user.updateOne(
        { userId: id },
        { $set: { 'link': link } },
        function (e, doc) {
            if (e) {
                console.log('Profile picture: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
}

function updatelinkinreviews(id, link) {
    stores.updateOne(
        { 'reviews.userId': id },
        { $set: { 'reviews.$[el].link': link } },
        { arrayFilters: [{ 'el.userId': id }] },
        function (e, doc) {
            if (e) {
                console.log('Error updating pic in reviews: ' + e);
            } else {
                console.log('Name updated in reviews');
            }
        }
    )
}

function updatelinkincommends(id, link) {
    stores.updateOne(
        { 'commends.userId': id },
        { $set: { 'commends.$[el].link': link } },
        { arrayFilters: [{ 'el.userId': id }] },
        function (e, doc) {
            if (e) {
                console.log('Error updating link in commends: ' + e);
            } else {
                console.log('link updated in commends');
            }
        }
    )
}

function updatelinkincomments(id, link) {
    post.updateOne(
        { 'comments.userId': id },
        { $set: { 'comments.$[el].link': link } },
        { arrayFilters: [{ 'el.userId': id }] },
        function (e, doc) {
            if (e) {
                console.log('Error updating link in comments: ' + e);
            } else {
                console.log('link updated in posts');
            }
        }
    )
}

function updatelinkinlikes(id, link) {
    likes.updateOne(
        { 'likes.userId': id },
        { $set: { 'likes.$[el].link': link } },
        { arrayFilters: [{ 'el.userId': id }] },
        function (e, doc) {
            if (e) {
                console.log('Error updating link in likes: ' + e);
            } else {
                console.log('link updated in Likes');
            }
        }
    )
}

function updatelinkinfollowers(id, link) {
    followers.updateOne(
        { 'followers.userId': id },
        { $set: { 'followers.$[el].link': link } },
        { arrayFilters: [{ 'el.userId': id }] },
        function (e, doc) {
            if (e) {
                console.log('Error updating link in followers: ' + e);
            } else {
                console.log('link updated in followers');
            }
        }
    )
}

function updatelinkinsearches(id, link) {
    searches.updateOne(
        { 'users.userId': id },
        { $set: { 'users.$[el].link': link } },
        { arrayFilters: [{ 'el.userId': id }] },
        function (e, doc) {
            if (e) {
                console.log('Error updating link in searches: ' + e);
            } else {
                console.log('link updated in searches');
            }
        }
    )
}

router.post(routes.updatebio, async function (req, res) {
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
    )
});

router.post(routes.updategroup, async function (req, res) {
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
    )
});

router.post(routes.updatepostdescription, async function (req, res) {
    // post.findOneAndUpdate(
    //     { link: req.body.link },
    //     { $set: { 'description': req.body.description } },
    //     function (e, doc) {
    //         if (e) {
    //             console.log('Post description: ' + e);
    //             res.json(e);
    //         } else {
    //             res.json(doc);
    //         }
    //     }
    // )

    try {
        updatepostdescription(req.body.link, req.body.description);
        updatedescriptioninfeeds(req.body.link, req.body.description);
        res.json('updated post description in post and feeds');
    } catch (e) {
        res.json(e);
    }
});

function updatepostdescription(link, description) {
    console.log('inside post description');
    console.log(link);
    console.log(description);
    post.findOneAndUpdate(
        { link: link },
        { $set: { 'description': description } },
        function (e, doc) {
            if (e) {
                console.log('Post description: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
}

function updatedescriptioninfeeds(link, description) {
    console.log('inside feeds description');
    console.log(link);
    console.log(description);
    feeds.updateOne(
        { 'snaps.link': link },
        { $set: { 'snaps.$[el].description': description } },
        { arrayFilters: [{ 'el.link': link }] },
        function (e, doc) {
            if (e) {
                console.log('Error updating description in feeds: ' + e);
            } else {
                console.log('description updated in feeds');
            }
        }
    )
}

router.post(routes.updatestoredescription, async function (req, res) {
    stores.updateOne(
        { link: req.body.link },
        { $set: { description: req.body.description } },
        function (e, doc) {
            if (e) {
                console.log('Error Updatedescription: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
});

router.post(routes.updateevent, async function (req, res) {
    // records.updateOne(
    //     { 'records.link': req.body.link },
    //     { $set: { 'records.$[el].event': req.body.event } },
    //     { arrayFilters: [{ 'el.link': req.body.link }] },
    //     function (e, doc) {
    //         if (e) {
    //             console.log('Error UpdateEvent: ' + e);
    //             res.json(e);
    //         } else {
    //             res.json(doc);
    //         }
    //     }
    // );

    try {
        updateeventinrecords(req.body.link, req.body.event);
        updateeventinstore(req.body.link, req.body.event);
        res.json('Updated event in store and records');
    }
    catch (e) {
        res.json(e);
    }
});

function updateeventinrecords(link, event) {
    console.log('event inside record');
    console.log(link);
    console.log(event);
    records.updateOne(
        { 'records.link': link },
        { $set: { 'records.$[el].event': event } },
        { arrayFilters: [{ 'el.link': link }] },
        function (e, doc) {
            if (e) {
                console.log('Error UpdateEvent: ' + e);
            } else {
                console.log('Updated event in records');
            }
        }
    );
}

function updateeventinstore(link, event) {
    console.log('event inside store');
    console.log(link);
    console.log(event);
    stores.updateOne(
        { link: link },
        { $set: { event: event } },
        function (e, doc) {
            if (e) {
                console.log('Error UpdateEvent: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    )
}

router.post(routes.updateimage, async function (req, res) {
    console.log('updating record image');
    console.log(req.body);
    records.updateOne(
        { 'records.link': req.body.link },
        { $set: { 'records.$[el].link': req.body.common } },
        { arrayFilters: [{ 'el.link': req.body.link }] },
        function (e, doc) {
            if (e) {
                console.log('Error UpdateImage: ' + e);
                res.json(e);
            } else {
                res.json(doc);
            }
        }
    );
});

export default router;
