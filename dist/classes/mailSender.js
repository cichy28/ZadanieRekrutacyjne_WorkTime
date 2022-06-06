"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require("nodemailer");
var pepipostTransport = require("nodemailer-pepipost-transport");
// TEST
var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "c75af99ea0d39a",
        pass: "329bd3b3db83cb",
    },
});
// Prod
// let transporter = nodemailer.createTransport({
// 	service: "Gmail", // no need to set host or port etc.
// 	auth: {
// 		user: "j.i.cichosz@gmail.com",
// 		pass: "ymogbbxbnxfxbfcx",
// 	},
// });
module.exports = transporter;
