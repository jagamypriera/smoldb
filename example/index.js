const {smoldb} = require('@jagamypriera/smoldb')
const {model} = require('./model')
const main = async () => {
	const prepareSmol = await smoldb({path: 'db.json', model: model})

	//smoldb is ready to use:
	const {smol} = model
	smol.number.push(new Date().getTime())
	smol.flags['pirate'] = true
	smol.a.very.deep.array.with.nothing.in.it.push('something')

	//use it in another file:
	require('./writer')
}
main()
