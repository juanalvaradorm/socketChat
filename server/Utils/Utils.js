const createmessage = (name, message) => {
    return {
        name,
        message,
        fecha: new Date().getTime()
    }
}


module.exports = {
    createmessage
}