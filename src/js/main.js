import historyTypes from './definitions/historyTypes.js';
import timePeriods from './definitions/timePeriods.js';
import subjects from './definitions/subjects.js';
import locations from './definitions/locations.js';
import frameworks from './definitions/frameworks.js';


const OUTPUT_ELEMENT = 'stringOutput';
const output = document.getElementById(OUTPUT_ELEMENT);

function getRandomNumberBetweenIndexRange(start = 0, end) {
    return Math.floor(Math.random() * end) + start;
}

function getRandomArrayItem(array) {
    return array[getRandomNumberBetweenIndexRange(0, array.length)];
}

const type = getRandomArrayItem(historyTypes);
let timePeriod = getRandomArrayItem(timePeriods);
const subject = getRandomArrayItem(subjects);
const location = getRandomArrayItem(locations);
const framework = getRandomArrayItem(frameworks);

// Remove timeperiod if subject is a proper noun
if (/[A-Z]/.test(subject.charAt(0))) {
    timePeriod = '';
}

/**
 * Cookie logic
 */
const COOKIE_NAME = 'phd_count';
const COUNT_ELEMENT = 'countOutput';

const countOuput = document.getElementById(COUNT_ELEMENT);

const cookies = readCookies();
let count = 1;

function readCookies() {
    const allCookies = document.cookie.split(';');

    return allCookies.map(a => {
        const cookie = a.split('=');

        return {
            name: cookie[0].trim(),
            value: cookie[1].trim(),
        }
    });
}

function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = '; expires='+date.toGMTString();
	}
	else {
        var expires = '';
    }

	document.cookie = name + '=' + value + expires +'; path=/; secure';
}

console.log('read cookies', cookies);

if (cookies.some(cookie => cookie.name === COOKIE_NAME)) {
    console.log('create cookie');
    const countCookie = cookies.filter(cookie => cookie.name === COOKIE_NAME);

    count = parseInt(countCookie[0].value) + 1;

    createCookie(COOKIE_NAME, count, 365);
}
else {
    console.log('no cookie located');
    createCookie(COOKIE_NAME, count, 365);
}

/* Write to document */
output.innerText = `${type} ${timePeriod} ${subject} ${location} ${framework}`;
countOuput.innerText = count > 1 ? `You have discarded ${count} perfectly good PhD topics.` : '';