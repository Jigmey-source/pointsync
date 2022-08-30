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
import notifications from '../models/notifications.js';
import records from '../models/records.js';
import Route from '../const/route.js';

const routes = new Route();

router.post(routes.updatename, async function (req, res) {
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
});

function updatenameinprofile(id, name) {
    user.findOneAndUpdate(
        { userId: id },
        { $set: { 'name': name } },
    ).catch(function (e) {
        console.log('Error updating name: ' + e);
    });
}

function updatenameinposts(id, name) {
    post.updateMany(
        { userId: id },
        { $set: { name: name } },
    ).catch(function (e) {
        console.log('Error updating name in feeds: ' + e);
    });
}

function updatenameinfeeds(id, name) {
    feeds.updateMany(
        { 'feeds.userId': id },
        { $set: { 'feeds.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating name in feeds: ' + e);
    });
}

function updatenameinreviews(id, name) {
    stores.updateMany(
        { 'reviews.userId': id },
        { $set: { 'reviews.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating name in reviews: ' + e);
    })
}

function updatenameincommends(id, name) {
    stores.updateMany(
        { 'commends.userId': id },
        { $set: { 'commends.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating name in commends: ' + e);
    })
}

function updatenameincomments(id, name) {
    post.updateMany(
        { 'comments.userId': id },
        { $set: { 'comments.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating name in comments: ' + e);
    })
}

function updatenameinlikes(id, name) {
    likes.updateMany(
        { 'likes.userId': id },
        { $set: { 'likes.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating name in likes: ' + e);
    })
}

function updatenameinicons(id, name) {
    icons.updateMany(
        { 'icons.userId': id },
        { $set: { 'icons.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating name in icons: ' + e);
    });
}

function updatenameinfollowers(id, name) {
    followers.updateMany(
        { 'followers.userId': id },
        { $set: { 'followers.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating name in followers: ' + e);
    })
}

function updatenameinsearches(id, name) {
    searches.updateMany(
        { 'users.userId': id },
        { $set: { 'users.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating name in searches: ' + e);
    })
}

function updatenameinsnapshots(id, name) {
    snapshots.updateMany(
        { 'snaps.userId': id },
        { $set: { 'snaps.$[el].name': name } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating name in snapshots: ' + e);
    })
}

router.post(routes.updateprofilepicture, async function (req, res) {
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
    ).catch(function (e) {
        console.log('Profile picture: ' + e);
    })
}

function updatelinkinreviews(id, link) {
    stores.updateMany(
        { 'reviews.userId': id },
        { $set: { 'reviews.$[el].link': link } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating pic in reviews: ' + e);
    })
}

function updatelinkincommends(id, link) {
    stores.updateMany(
        { 'commends.userId': id },
        { $set: { 'commends.$[el].link': link } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating link in commends: ' + e);
    })
}

function updatelinkincomments(id, link) {
    post.updateMany(
        { 'comments.userId': id },
        { $set: { 'comments.$[el].link': link } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating link in comments: ' + e);
    })
}

function updatelinkinlikes(id, link) {
    likes.updateMany(
        { 'likes.userId': id },
        { $set: { 'likes.$[el].link': link } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating link in likes: ' + e);
    });
}

function updatelinkinfollowers(id, link) {
    followers.updateMany(
        { 'followers.userId': id },
        { $set: { 'followers.$[el].link': link } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating link in followers: ' + e);
    });
}

function updatelinkinsearches(id, link) {
    searches.updateMany(
        { 'users.userId': id },
        { $set: { 'users.$[el].link': link } },
        { arrayFilters: [{ 'el.userId': id }] },
    ).catch(function (e) {
        console.log('Error updating link in searches: ' + e);
    })
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
    );
});

router.post(routes.updatepostdescription, async function (req, res) {
    try {
        updatepostdescription(req.body.link, req.body.description);
        updatesnapdescription(req.body.link, req.body.description);
        updateicondescription(req.body.link, req.body.description);
        updatedescriptioninfeeds(req.body.link, req.body.description);
        res.json('updated post description in post and feeds');
    } catch (e) {
        res.json(e);
    }
});

function updatepostdescription(link, description) {
    post.updateOne(
        { link: link },
        { $set: { 'description': description } },
    ).catch(function (e) {
        console.log('Post description: ' + e);
    });
}

function updatesnapdescription(link, description) {
    snapshots.updateOne(
        { 'snaps.link': link },
        { $set: { 'snaps.$[el].description': description } },
        { arrayFilters: [{ 'el.link': link }] },
    ).catch(function (e) {
        console.log('Error updating description in snapshots: ' + e);
    })
}

function updateicondescription(link, description) {
    icons.updateOne(
        { 'icons.link': link },
        { $set: { 'icons.$[el].description': description } },
        { arrayFilters: [{ 'el.link': link }] },
    ).catch(function (e) {
        console.log('Error updating description in icons: ' + e);
    });
}

function updatedescriptioninfeeds(link, description) {
    feeds.updateMany(
        { 'feeds.link': link },
        { $set: { 'feeds.$[el].description': description } },
        { arrayFilters: [{ 'el.link': link }] },
    ).catch(function (e) {
        console.log('Error updating description in feeds: ' + e);
    });
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
    try {
        updateeventinrecords(req.body.link, req.body.event);
        updateeventinstore(req.body.link, req.body.event);
        res.json('Updated event in store and records');
    } catch (e) {
        res.json(e);
    }
});

function updateeventinrecords(link, event) {
    records.updateOne(
        { 'records.link': link },
        { $set: { 'records.$[el].event': event } },
        { arrayFilters: [{ 'el.link': link }] },
    ).catch(function (e) {
        console.log('Error UpdateEvent: ' + e);
    });
}

function updateeventinstore(link, event) {
    stores.updateOne(
        { link: link },
        { $set: { event: event } },
    ).catch(function (e) {
        console.log('Error UpdateEvent: ' + e);
    });
}

router.post(routes.updateimage, async function (req, res) {
    try {
        updateinstore(req.body.link, req.body.common);
        updateinchildstores(req.body.link, req.body.common);
        updateinnotifications(req.body.link, req.body.common);
        updateinrecord(req.body.link, req.body.common);
        res.json('updated link in record and store');
    } catch (e) {
        res.json(e);
    }
});

function updateinstore(link, common) {
    stores.updateOne(
        { link: link },
        { $set: { link: common } },
    ).catch(function (e) {
        console.log('Error UpdateLink in store: ' + e);
    });
}

function updateinchildstores(link, common) {
    stores.updateMany(
        { parent: link },
        { $set: { parent: common } },
    ).catch(function (e) {
        console.log('Error UpdateLink in store: ' + e);
    });
}

function updateinnotifications(link, common) {
    notifications.updateMany(
        { mediaUrl: link },
        { $set: { mediaurl: common } },
    ).catch(function (e) {
        console.log('cant update image in notfications: ' + e);
    })
}

function updateinrecord(link, common) {
    records.updateOne(
        { 'records.link': link },
        { $set: { 'records.$[el].link': common } },
        { arrayFilters: [{ 'el.link': link }] },
    ).catch(function (e) {
        console.log('Error UpdateLink in record: ' + e);
    });
}

export default router;
