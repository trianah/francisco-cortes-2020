const requireDir = require('require-dir')
const log = require('fancy-log')
const c = require('ansi-colors')
const argList = require('./scripts/utils/argv')
const TASK = require('./config/task.config')
const PATHS = require('./config/path.config.json')
const { config, env } = argList(process.argv)

global.env = env || 'development'
global.config = config || 'default'
global.PRODUCTION = global.env === 'production'
global.TASK = TASK(env)
global.PATHS = PATHS
// after the above, some globals are used
global.WEBPACK_CONFIG = require('./scripts/webpack/config.base')

process.env.NODE_ENV = env


log(`${c.yellow(`
 _________
< ${c.bold('mudpack')} >
 ---------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`)}

	ENV: ${c.bold.magenta(global.env)}, CONFIG: ${c.bold.magenta(global.config)}\n
`)

requireDir('./scripts/tasks', {
	recurse: true
})
