const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt','utf8');
const rawInputs = input.split('\n');

// Preprocessing text
const rectangles = rawInputs.map(line => {
	
	[claimNum, at, groupOne, groupTwo] = line.split(' ');
	[left, top] = groupOne.slice(0, -1).split(',').map(x => Number(x));
	[width, height] = groupTwo.split('x').map(x => Number(x));

	return {
		claimNum,
		top,
		left,
		width,
		height
	}
});

// Build an overlap hashmap
const hashGrid = buildGrid(rectangles);

function buildGrid(rectangles) {
	let grid = {};
	for (const {claimNum, top, left, width, height} of rectangles) {
		for (let x = left; x < left + width; x++) {
			for (let y = top; y < top + height; y++) {
				grid[`${x},${y}`] = (grid[`${x},${y}`] || 0) + 1;
			}			
		}
	}
	return grid;
}

// Part 1: Find all squares on the grid where two (or more) rectangles overlap
function determineOverlap(rectangles, grid) {
	return _.values(grid).filter(g => g > 1).length;
}

console.log(determineOverlap(rectangles, hashGrid));

// Part 2: Find the first non-overlapping rectangle
function determineNonOverlappedRectangles(rectangles, grid) {
	for (const {claimNum, top, left, width, height} of rectangles) {
		let overlaps = 0;
		for (let x = left; x < left + width; x++) {
			for (let y = top; y < top + height; y++) {
				if (grid[`${x},${y}`] > 1) {
					overlaps++;
				}
			}
		}
		if (overlaps === 0) {
			return claimNum;
		}
	}
}

console.log(determineNonOverlappedRectangles(rectangles, hashGrid));