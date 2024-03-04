// import { Router } from "express";
// import Route from "../../const/route";
// import searchhistory from "../../models/search_history";

// const router = Router();
// const routes = new Route();

// router.post(routes.usertosearch, async function (req, res) {
//     const data = {
//         link: req.body.link,
//         name: req.body.name,
//         userId: req.body.userId,
//     };
//     searchhistory.updateOne(
//         //req.body.id is the id of the user
//         //req.body.useId is the id of the another user that the user has searched for
//         { userId: req.body.id },
//         { $push: { users: data } },
//         { upsert: true, new: true },
//         function (e, result) {
//             if (e) {
//                 console.log('Error adding user to search: ' + e);
//                 res.json(e);
//             } else {
//                 console.log('New user added');
//                 res.json(result);
//             }
//         }
//     );
// });

// router.post(routes.placetosearch, async function (req, res) {
//     const data = {
//         locality: req.body.locality,
//         adminArea: req.body.adminArea,
//         country: req.body.country,
//     };
//     searchhistory.updateOne(
//         { userId: req.body.userId },
//         { $push: { places: data } },
//         { upsert: true, new: true },
//         function (e, result) {
//             if (e) {
//                 console.log('Error adding place to search: ' + e);
//                 res.json(e);
//             } else {
//                 console.log('New place added');
//                 res.json(result);
//             }
//         }
//     ).explain("executionStats");
// });

// router.post(routes.storetosearch, async function (req, res) {
//     const data = {
//         title: req.body.title,
//         type: req.body.type,
//     };
//     searchhistory.updateOne(
//         { userId: req.body.userId },
//         { $push: { stores: data } },
//         { upsert: true, new: true },
//         function (e, result) {
//             if (e) {
//                 console.log('Error adding store to search: ' + e);
//                 res.json(e);
//             } else {
//                 console.log('New store added');
//                 res.json(result);
//             }
//         }
//     );
// });

// router.post(routes.userfromsearch, async function (req, res) {
//     searchhistory.updateOne(
//         { userId: req.body.userId },
//         { $pull: { 'users': { userId: req.body.id } } },
//         function (e, doc) {
//             if (e) {
//                 console.log('Error removing from search history: ' + e);
//                 res.json(e);
//             } else {
//                 console.log(doc);
//                 res.json(doc);
//             }
//         }
//     )
// });

// router.post(routes.placefromsearch, async function (req, res) {
//     searchhistory.updateOne(
//         { userId: req.body.userId },
//         { $pull: { 'places': { locality: req.body.locality, adminArea: req.body.adminArea } } },
//         function (e, doc) {
//             if (e) {
//                 res.json(e);
//             } else {
//                 res.json(doc);
//             }
//         }
//     )
// });

// export default router;