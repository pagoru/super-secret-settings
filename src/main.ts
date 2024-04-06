
/**
 * Created by pagoru on 14 Jun 17.
 * Updated by cout970 on 16 Oct 2021.
 * Updated by pagoru on 06 Apr 2024.
 */

import randomSeed from 'random-seed'
import sha from 'sha.js'
/**
 * Default set of characters for passwords
 */
const DEFAULT_CHARACTER_SET = "ABCDFGHIJKLMNOPQRSTUVWXYZabdfghijklmnopqrstuvwxyz1234567890";
/**
 * Generates a sha512 hash from an arbitrary text
 *
 * @param text
 */
export const getHash = (text: string) => sha('sha512').update(text).digest('hex');
/**
 * Generates a password for a service
 *
 * @param password master password
 * @param service name of the service
 * @param length password length
 * @param alphabet strings of valid password characters
 */
export const getPassword = (
	password: string,
	service: string,
	length: number = 12,
	alphabet: string = DEFAULT_CHARACTER_SET
): string => {
	let generatedPassword = "";
	const hexadecimalSeed = getHash(password + getHash(service));
	const random = randomSeed.create(hexadecimalSeed);
	for (let i = 0; i < length; i++)
		generatedPassword += alphabet[random(alphabet.length)];
	return generatedPassword;
}

/**
 * Generates a CSS HSL color to easily distinguish between different texts using their colors
 *
 * @param text the input text to hash
 * @param s S parameter of HSL, value between 0 and 100
 * @param l L parameter of HSL, value between 0 and 100
 */
export const getCssColor = (text: string, s: number = 75, l: number = 75) => {
	const seed = getHash(text);
	const random = randomSeed.create(seed);
	const h = random.intBetween(0, 360);
	// HSL: https://www.w3schools.com/colors/colors_hsl.asp
	return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}