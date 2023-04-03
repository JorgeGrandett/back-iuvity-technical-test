const path = require('path')
const autoload = require('@fastify/autoload')
const cors  = require('@fastify/cors');

async function app(fastify, options){
    fastify.register(autoload,{
        dir: path.join(__dirname, 'routes')
    });
    fastify.register(cors, {
        origin: "*",
        methods: ["GET","POST","PUT","DELETE"]
    });
}
module.exports = app