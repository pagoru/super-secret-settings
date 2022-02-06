"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCssColor = exports.getPassword = exports.getHash = void 0;
/**
 * Created by Pablo on 14 Jun 17.
 * Updated by cout970 on 16 Oct 2021.
 */
var randomSeed = require("random-seed");
/**
 * Default set of characters for passwords
 */
var characters = "ABCDFGHIJKLMNOPQRSTUVWXYZabdfghijklmnopqrstuvwxyz1234567890";
/**
 * Generates a sha512 hash from an arbitrary text
 *
 * @param text
 */
function getHash(text) {
    var shajs = require('sha.js');
    return shajs('sha512').update(text).digest('hex');
}
exports.getHash = getHash;
/**
 * Generates a password for a service
 *
 * @param password master password
 * @param service name of the service
 * @param length password length
 * @param alphabet strings of valid password characters
 */
function getPassword(password, service, length, alphabet) {
    if (length === void 0) { length = 12; }
    if (alphabet === void 0) { alphabet = characters; }
    var generatedPassword = "";
    var hexadecimalSeed = getHash(password + getHash(service));
    var random = randomSeed.create(hexadecimalSeed);
    for (var i = 0; i < length; i++)
        generatedPassword += alphabet[random(alphabet.length)];
    return generatedPassword;
}
exports.getPassword = getPassword;
/**
 * Generates a CSS HSL color to easily distinguish between different texts using their colors
 *
 * @param text the input text to hash
 * @param s S parameter of HSL, value between 0 and 100
 * @param l L parameter of HSL, value between 0 and 100
 */
function getCssColor(text, s, l) {
    if (s === void 0) { s = 75; }
    if (l === void 0) { l = 75; }
    var seed = getHash(text);
    var random = randomSeed.create(seed);
    var h = random.intBetween(0, 360);
    // HSL: https://www.w3schools.com/colors/colors_hsl.asp
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}
exports.getCssColor = getCssColor;
//# sourceMappingURL=index.js.map