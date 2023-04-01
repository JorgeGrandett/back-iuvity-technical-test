async function userRoutes (fastify, options) {
    fastify.get('/user/:id', async function(request, reply) {
        return 'get user';
    });
    fastify.get('/user/list-users', async function(request, reply) {
        return "list userRoutes";
    });
    fastify.post('/user/create-user', async function(request, reply) {
        return "create user";
    });
    fastify.put('/user/update-user/:id', async function(request, reply) {
        return "put user";
    });
    fastify.delete('/user/delete-user/:id', async function(request, reply) {
        return "delete user";
    });
}

module.exports = userRoutes;