const { getUser, listUsers, createUser, updateUser, deleteUser } = require('../controllers/user.controller');

async function userRoutes (fastify, options) {
    fastify.get('/user/:id', getUser);
    fastify.get('/user/list-users', listUsers);
    fastify.post('/user/create-user', createUser);
    fastify.put('/user/update-user/:id', updateUser);
    fastify.delete('/user/delete-user/:id', deleteUser);
}

module.exports = userRoutes;