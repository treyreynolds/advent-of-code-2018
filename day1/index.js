const fs = require('fs');
const _ = require('lodash');

// The device displays frequency changes of +1, -2, +3, +1, 
// then starting from a frequency of zero, the following changes would occur:

// Current frequency  0, change of +1; resulting frequency  1.
// Current frequency  1, change of -2; resulting frequency -1.
// Current frequency -1, change of +3; resulting frequency  2.
// Current frequency  2, change of +1; resulting frequency  3.

const input = fs.readFileSync('./input.txt','utf8');
const deltas = input.split('\n').map(n => parseInt(n.trim(),10));

// Part 1 : Find the resulting frequency after one trip through the changes
console.log(_.sum(deltas));

// Part 2 : Find the first time the resulting frequency is the same as a previous one.
const findFirstDuplicateFrequency = deltas => {
	let frequencies = {}
	let current = 0;

	// according to the instructions we keep looping through the input
	// until we find the duplicate frequency, this could take many loops.
	while(true) {

		for(let delta of deltas) {
			current = current + delta;

			if (frequencies[current]) {
				frequencies[current] = frequencies[current] + 1;
				return current;
			} else {
				frequencies[current] = 1;
			}
		}

	}	
};

console.log(findFirstDuplicateFrequency(deltas));