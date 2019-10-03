const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { createmessage } = require('../Utils/Utils');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (usuario, callback) => {
        if (!usuario.nombre || !usuario.sala) {
            return callback({
                //error = true,
                message: 'El nombre y sala es requerido'
            })
        }

        //console.log(usuario.sala);
        client.join(usuario.sala);

        let personas = usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala)

        client.broadcast.to(usuario.sala).emit('listaPersonas', usuarios.getPersonasPorSala(usuario.sala));
        //console.log(personas);
        callback(personas);

    });

    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = createmessage(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    client.on('disconnect', () => {
        let PersonaBorrada = usuarios.borrarPersona(client.id);
        //client.broadcast.emit('crearMensaje', { usuario: 'Administrador', mensaje: `${PersonaBorrada.nombre} abandono el chat` });
        client.broadcast.to(PersonaBorrada.sala).emit('crearMensaje', createmessage('ADMIN', `${PersonaBorrada.nombre} salio`));
        client.broadcast.to(PersonaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(PersonaBorrada.sala));
    })

    //Mensaje Privado
    client.on('privateMessage', data => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('privateMessage', createmessage(persona.nombre, data.mensaje));
    });


});