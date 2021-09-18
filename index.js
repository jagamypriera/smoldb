const fs = require('fs').promises
exports.isReady = false
/**
 * A small file-based JSON database.
 * @param {string} path path to database file
 * @param {any} model JSON model of database
 * @param {number} commitInterval interval to write data from memory to file (in milliseconds) - optional
 */
exports.smoldb = async ({path = '', model, commitInterval = 100}) => {
	if (this.isReady) return true
	const acceptedModel = {
		smol: {
			foo: [],
			bar: {},
			youCanAddAnyShitHere: 'YES'
		}
	}
	if (!path) {
		throw new Error('no db path')
	}
	if (!model.smol) {
		throw new Error(
			`'smol' object doesn't exists, example correct model: \n${JSON.stringify(
				acceptedModel,
				null,
				2
			)}`
		)
	}

	let file = await fs.readFile(path, 'utf8')
	if (!file) file = JSON.stringify(model.smol)
	model.smol = {...model.smol, ...JSON.parse(file)}
	let lastSaved = JSON.stringify(model.smol)
	const dumpIt = async () => {
		//console.log('dumpIt')
		//const start = new Date().getTime()
		const stringifyMemory = JSON.stringify(model.smol)
		if (lastSaved != stringifyMemory) {
			await fs.writeFile(path, JSON.stringify(model.smol, null, 4))
			lastSaved = stringifyMemory
		}
		//console.log('Duration:', new Date().getTime() - start, 'ms')
	}
	setInterval(async () => await dumpIt(), commitInterval)
	this.isReady = true
	return true
}
