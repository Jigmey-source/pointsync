import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Strings } from "./const/strings";

const app = express();
import router from './routes/routes';
const strings = new Strings();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

try {
    mongoose.connect(strings.mongouri);
} catch (e) {
    console.log(e);
} finally {
    app.get('/', function (req, res) {
        const response = { message: "Pointsync Server on Heroku" };
        res.json(response);
    });

    app.use('/', router);
}

// mongoose.connect(strings.mongouri, { useNewUrlParser: true, useUnifiedTopology: true }).then(function () {
//     app.get('/', function (req, res) {
//         const response = { message: "Pointsync Server on Heroku" };
//         res.json(response);
//     });

//     app.use('/', router);
// });

const port = process.env.PORT || 78;
app.listen(port, function () {
    console.log('server started at 78');
});
