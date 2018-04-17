"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Pablo on 14 Jun 17.
 * Last update 17 Apr 18.
 */
var randomSeed = require("random-seed");
var crypto_min_js_1 = require("./crypto.min.js");
var characters = "ABCDFGHIJKLMNOPQRSTUVWXYZabdfghijklmnopqrstuvwxyz1234567890";
function getHash(text) {
    var shasum = crypto_min_js_1.createHash('sha512');
    shasum.update(text);
    return shasum.digest('hex');
}
exports.getHash = getHash;
function getPassword(password, service, length) {
    if (length === void 0) { length = 12; }
    var generatedPassword = "";
    var hexadecimalSeed = getHash(password + getHash(service));
    var random = randomSeed.create(hexadecimalSeed);
    for (var i = 0; i < length; i++)
        generatedPassword += characters[random(characters.length)];
    return generatedPassword;
}
exports.getPassword = getPassword;
