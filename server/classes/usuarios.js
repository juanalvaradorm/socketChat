class Usuarios {

    constructor() {
        this.personas = [];

    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.personas.filter(persona => persona.sala === sala);
    }

    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personaPorSala = this.personas.filter(persona => persona.sala === sala)
        return personaPorSala;
    }

    borrarPersona(id) {
        let PersonaB = this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id != id);
        return PersonaB;
    }

}



module.exports = {
    Usuarios
}