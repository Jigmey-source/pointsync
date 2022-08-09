"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const strings_1 = require("./const/strings");
const app = (0, express_1.default)();
const routes_1 = __importDefault(require("./routes/routes"));
const strings = new strings_1.Strings();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
try {
    mongoose_1.default.connect(strings.mongouri);
}
catch (e) {
    console.log(e);
}
finally {
    app.get('/', function (req, res) {
        const response = { message: "Pointsync Server on Heroku" };
        res.json(response);
    });
    app.use('/', routes_1.default);
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
