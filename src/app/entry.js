debug.enable(process.env.DEBUG)

const log = debug('entry')

log('Environment', process.env)

require('jquery')
require('bootstrap')
require('app/start')
