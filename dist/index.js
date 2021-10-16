"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPassword = exports.getHash = void 0;
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
    var hasha = require('hasha');
    return hasha(text, { encoding: 'hex', algorithm: 'sha512' });
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
//# sourceMappingURL=index.js.map