const fs = require('fs');
const nzfunc = require('nzfunc');

class letsConfig {

	constructor(options = {}, dir = (__dirname + '/'), fileName = 'config.json') {
		try {
			// console.log('Checking config file:', dir + fileName);
			let contents = fs.readFileSync(dir + fileName);
			if (nzfunc.hasJsonStructure(contents.toString()) === true) {
				// config has been read
				let options = JSON.parse(contents);
				// console.log(options);
				let keys = Object.keys(options);
				// console.log(keys);
				for (let i = 0, l = keys.length; i < l; i++) {
					this[keys[i]] = options[keys[i]];
				}
				// console.log(this);
			} else {
				throw new Error('The file does not have a JSON structure!');
			}
		} catch (e) {
			console.log(`Could not read config.json file: ${e}`);
			fs.writeFileSync(dir + fileName, JSON.stringify(options));
		}
	}

}

module.exports = letsConfig;
