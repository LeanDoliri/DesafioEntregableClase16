import knex from 'knex';

class ContenedorSQL {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }

    async getById(id) {

    }

    async getAll() {
        try {
            return this.knex(this.table).select("*").limit(15)
        } catch (error) {
            
        }
    }

    async guardar(elem) {
        
    }

    async actualizar(elem, id) {
        
    }

    async borrar(id) {
        
    }

    async borrarAll() {
        
    }

    async desconectar() {
    
    }
}

export default ContenedorSQL;