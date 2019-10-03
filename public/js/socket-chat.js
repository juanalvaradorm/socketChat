var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('Usuario o sala invalido');
} else {
    if (params.get('nombre') === "") {
        window.location = 'index.html';
        throw new Error('Usuario o sala invalido');
    }
    if (params.get('sala') === "") {
        window.location = 'index.html';
        throw new Error('Usuario o sala invalido');
    }
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios Conectados: ', resp);
    });

});



// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// // Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});


//Escuchar cambios de usuarios
socket.on('listaPersonas', function(personas) {
    console.log(personas);
});

//Mensajes Privados
socket.on('privateMessage', function(Message) {
    console.log(Message);
});