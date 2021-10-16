/**
 * Created by Pablo on 14 Jun 17.
 * Updated by cout970 on 16 Oct 2021.
 */
import * as randomSeed from 'random-seed';

/**
 * Default set of characters for passwords
 */
const characters = "ABCDFGHIJKLMNOPQRSTUVWXYZabdfghijklmnopqrstuvwxyz1234567890";

/**
 * Generates a sha512 hash from an arbitrary text
 *
 * @param text
 */
export function getHash(text) {
    const hasha = require('hasha');
    return hasha(text, {encoding: 'hex', algorithm: 'sha512'});
}

/**
 * Generates a password for a service
 *
 * @param password master password
 * @param service name of the service
 * @param length password length
 * @param alphabet strings of valid password characters
 */
export function getPassword(password: string, service: string, length: number = 12, alphabet: string = characters) {
    let generatedPassword = "";

    const hexadecimalSeed = getHash(password + getHash(service));
    const random = randomSeed.create(hexadecimalSeed);

    for (let i = 0; i < length; i++)
        generatedPassword += alphabet[random(alphabet.length)];

    return generatedPassword;
}