/**
 * Created by Pablo on 14 Jun 17.
 * Last update 17 Apr 18.
 */
import * as randomSeed from 'random-seed';
import * as crypto from './crypto.min';

const characters = "ABCDFGHIJKLMNOPQRSTUVWXYZabdfghijklmnopqrstuvwxyz1234567890";

export function getHash(text) {
    let shasum = crypto['createHash']('sha512');
    shasum.update(text);
    return shasum.digest('hex', null);
}

export function getPassword(password, service, length = 12) {
    let generatedPassword = "";

    const hexadecimalSeed = getHash(password + getHash(service));
    const random = randomSeed.create(hexadecimalSeed);

    for (let i = 0; i < length; i++)
        generatedPassword += characters[random(characters.length)];

    return generatedPassword;
}