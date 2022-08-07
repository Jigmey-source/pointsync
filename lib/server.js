"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const strings_1 = require("./const/strings");
const user = require('./src/models/user');
const app = (0, express_1.default)();
const strings = new strings_1.Strings();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
mongoose_1.default.connect(strings.mongouri).then(function () {
    app.get('/', function (req, res) {
        res.send('Home Page muhahaahahahah');
    });
    app.get('/users/add', function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const muser = new user({
                blocked: {},
                description: 'helloooo',
                followers: 5,
                following: {},
                group: 'Tibet',
                hideFrom: {},
                place_marker: {},
                posts: 7,
                name: 'goni',
                platform: {},
                profile_picture: {},
                userId: '007',
            });
            yield muser.save();
            const response = { message: "New user added to users" };
            res.json(response);
        });
    });
    app.get('/users', function (req, res) {
        var users = user.find();
        res.send(users);
    });
});
const PORT = process.env.PORT || 78;
app.listen(PORT, function () {
    console.log('server started at PORT:' + PORT);
});
