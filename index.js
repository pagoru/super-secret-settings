/**
 * Created by Pablo on 14 Jun 17.
 */
const randomSeed = require('random-seed');
const crypto = require('./crypto.min');

const characters = "ABCDFGHIJKLMNOPQRSTUVWXYZabdfghijklmnopqrstuvwxyz1234567890";

function getHash(text) {
    let shasum = crypto.createHash('sha512');
    shasum.update(text);
    return shasum.digest('hex');
}

function getPassword(password, service, length = 12) {
    let generatedPassword = "";

    const hexadecimalSeed = getHash(password + getHash(service));
    const random = randomSeed.create(hexadecimalSeed);

    for (let i = 0; i < length; i++)
        generatedPassword += characters[random(characters.length)];

    return generatedPassword;
}

module.exports.getHash = getHash;
module.exports.getPassword = getPassword;

/**
 * @deprecated since version 2.0.0
 */
module.exports.class = class SuperSecretSettings {

    /**
     * @deprecated since version 2.0.0
     */
    constructor(params){
        this._masterPassword = params.masterPassword;
    }

    /**
     * @deprecated since version 2.0.0
     */
    getMasterPasswordHash() {
        return getHash(this._masterPassword);
    }

    /**
     * @deprecated since version 2.0.0
     */
    generatePassword(params) {
        const letters = (params.letters === undefined ? characters : params.letters).split("");
        const length = params.length === undefined ? 12 : params.length;
        const serviceName = params.serviceName;

        let password = "";

        const hexadecimalSeed = getHash(this._masterPassword + getHash(serviceName));
        const random = randomSeed.create(hexadecimalSeed);

        for (let i = 0; i < length; i++){
            let randomLetter = random(letters.length);
            password += letters[randomLetter];
        }
        return password;
    }

};