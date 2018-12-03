const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt','utf8');
const boxIds = input.split('\n').map(n => n.trim());

// Part 1 : Calculate a checksum defined as 
// "all words containing exactly 2 of the same letter" times "all words containing exactly 3"
function calculateChecksum(ids) {
	let twoLetterCount = 0;
	let threeLetterCount = 0;

	for (let id of ids) {
		const letterCount = _.countBy(id.split(''));

		twoLetterCount = _.includes(_.values(letterCount), 2) ? twoLetterCount + 1 : twoLetterCount;
		threeLetterCount = _.includes(_.values(letterCount), 3) ? threeLetterCount + 1 : threeLetterCount;
	}

	return twoLetterCount * threeLetterCount;
}

console.log(calculateChecksum(boxIds));

// Part 2: Find two ids which differ by exactly one letter only in the same position
function findSimilarIds(ids) {
	let idChecksums = {};


	for (let id of ids) {
		const otherIds = _.without(ids, id);
		for (let otherId of otherIds) {
			let diff = '';

			for (let i = 0; i < id.length; i++) {
				if (id[i] !== otherId[i]) {
					diff += id[i];
				}

				if (diff.length > 1) {
					continue;
				}
			}

			if(diff.length === 1) {
				return `${id}\n${otherId}`;
			}
		}
	}
	
	return 'similar IDs Not found';
}

console.log(findSimilarIds(boxIds));