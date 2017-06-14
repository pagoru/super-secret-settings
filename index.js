/**
 * Created by Pablo on 14 Jun 17.
 */
const path = require("path");
const randomSeed = require('random-seed');
const crypto = require('crypto');

const defaultLetters = "ABCDFGHIJKLMNOPQRSTUVWXYZabdfghijklmnopqrstuvwxyz1234567890";

const hash = (text) => {
    let shasum = crypto.createHash('sha512');
    shasum.update(text);
    return shasum.digest('hex');
};

module.exports = class SuperSecretSettings {
    constructor(params){
        this._masterPassword = params.masterPassword;
    }

    getMasterPasswordHAsh() {
        return hash(this._masterPassword);
    }

    generatePassword(params) {
        const letters = (params.letters === undefined ? defaultLetters : params.letters).split("");
        const length = params.length === undefined ? 12 : params.length;
        const serviceName = params.serviceName;

        let password = "";

        const hexadecimalSeed = hash(this._masterPassword + hash(serviceName));
        const random = randomSeed.create(hexadecimalSeed);

        for (let i = 0; i < length; i++){
            let randomLetter = random(letters.length);
            password += letters[randomLetter];
        }
        return password;
    }
};