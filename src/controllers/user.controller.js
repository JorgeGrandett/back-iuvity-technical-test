const User = require('../models/user.model');

const getUser = async function(request, reply) {
    try {
        if (request.params.id == undefined || request.params.id == ''){
            return reply.code(400).send('Ingrese el id del usuario a buscar');
        }

        const user = await User.find({id: request.params.id});

        if(user.length == 0){
            return reply.code(404).send('El usuario que busca no existe');
        }
        return reply.code(200).send(user[0]);
    } catch (error) {
        console.log(error);
        reply.code(500).send('Error al consultar el usuario');
    }
};

const listUsers = async function(request, reply) {
    try {
        const users = await User.find();

        if(users.length == 0){
            return reply.code(404).send('No hay usuarios registrados en la DB');
        }
        return reply.code(200).send(users);
    } catch (error) {
        console.log(error);
        reply.code(500).send('Error al listar los usuarios');
    }
};

const createUser = async function(request, reply) {
    try {
        if(request.body == undefined || request.body.user == undefined) {
            return reply.code(400).send(`Ingrese los datos del usuario a registrar`);
        }
        const userData = {
            name: request.body.user.name,
            lastName: request.body.user.lastName,
            id: request.body.user.id,
            age: request.body.user.age,
            email: request.body.user.email,
            phone: request.body.user.phone,
        };

        for (const key in userData) {
            if (userData[key] == undefined || userData[key] == "") {
                return reply.code(400).send(`Campo ${key} faltante en los datos del Usuario`);
            }
        }

        const searchId = await User.find({id: userData.id});

        if(searchId.length != 0) {
            return reply.code(409).send(`Ya existe un usuario registrado con el ID ${userData.id}`);
        } 

        let userAux = new User (userData);
        await userAux.save()

        return reply.code(200).send(`Usuario creado con exito`);
    } catch (error) {
        console.log(error);
        reply.code(500).send('Error al crear el usuario');
    }
};

const updateUser = async function(request, reply) {
    try {
        if(request.body == undefined || request.body.user == undefined) {
            return reply.code(400).send(`Ingrese los datos del usuario a registrar`);
        }
        const userData = {
            name: request.body.user.name,
            lastName: request.body.user.lastName,
            id: request.body.user.id,
            age: request.body.user.age,
            email: request.body.user.email,
            phone: request.body.user.phone,
        };

        console.log(userData);
        for (const key in userData) {
            if (userData[key] == undefined || userData[key] == "") {
                return reply.code(400).send(`Campo ${key} faltante en los datos del Usuario`);
            }
        }

        if (request.params.id == undefined || request.params.id == ''){
            return reply.code(400).send('Ingrese el id del usuario que desea actualizar');
        }

        const user = await User.find({id: request.params.id});

        if(user.length == 0){
            return reply.code(404).send('El usuario que desea actualizar no existe');
        }

        await User.updateOne({ id: request.params.id }, userData );

        return reply.code(200).send(`Usuario actualizado correctamente`);
    } catch (error) {
        console.log(error);
        reply.code(500).send('Error al eliminar el usuario');
    }
};

const deleteUser = async function(request, reply) {
    try {
        if (request.params.id == undefined || request.params.id == ''){
            return reply.code(400).send('Ingrese el id del usuario a eliminar');
        }

        const userDelete = await User.deleteOne({ id: request.params.id });

        if (userDelete.deletedCount == 0) {
            return reply.code(404).send(`El Usuario que trata de eliminar no existe`);
        }

        return reply.code(200).send(`Usuario Eliminado correctamente`);
    } catch (error) {
        console.log(error);
        reply.code(500).send('Error al eliminar el usuario');
    }
};

module.exports = {
    getUser,
    listUsers,
    createUser,
    updateUser,
    deleteUser,
}