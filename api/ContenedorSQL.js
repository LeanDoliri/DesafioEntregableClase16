import knex from 'knex';

class ContenedorSQL {

    constructor(config, table) {
        this.knex = knex(config);
        this.table = table;
    }
    
    async getById(id) {
        try {
            const result = await this.knex(this.table).where('id', id).select();
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const result = await this.knex(this.table).select("*");
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async create(data) {
        try {
            await this.knex(this.table).insert(data);
        } catch (error) {
            console.log(error);
        }
    }

    async actualizar(elem, id) {
        try {
            await this.knex(this.table).where('id', id).update(elem);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            await this.knex(this.table).where('id', id).del();
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            await this.knex(this.table).del();
        } catch (error) {
            console.log(error);
        }
    }
}

export default ContenedorSQL;