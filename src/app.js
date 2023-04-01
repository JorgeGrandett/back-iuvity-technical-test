const path = require('path')
const autoload = require('@fastify/autoload')

async function app(fastify, options){
    fastify.register(autoload,{
        dir: path.join(__dirname, 'routes')
    })
}
module.exports = app