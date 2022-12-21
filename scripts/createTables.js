import { options } from "../src/config.js";
import knex from "knex";

const knexConnection = knex(options.sqlite3);

(async () => {
    try {
        // Borrar tabla cuando existan
        await knexConnection.schema.dropTableIfExists('products');
        await knexConnection.schema.dropTableIfExists('chat');

        // Tabla de productos
        await knexConnection.schema.createTable('products', table =>{
            table.increments('id').primary();
            table.string('producto').notNullable();
            table.float('precio').notNullable();
            table.string('foto');
        })

        // Tabla del Chat
        await knexConnection.schema.createTable('chat', table =>{
            table.increments('id').primary();
            table.string('user').notNullable();
            table.float('txt').notNullable();
        })

        const products = [
            {producto: 'Guitarra', precio: 40000, foto: 'https://cdn0.iconfinder.com/data/icons/camping-2-3/66/113-256.png'},
            {producto: 'Guitarra', precio: 40000, foto: 'https://cdn0.iconfinder.com/data/icons/camping-2-3/66/113-256.png'},
            {producto: 'Guitarra', precio: 40000, foto: 'https://cdn0.iconfinder.com/data/icons/camping-2-3/66/113-256.png'}
        ]

        // Carga de productos
        await knexConnection('products').insert(products);

    } catch (error) {
        console.log(error);
    } finally {
        knexConnection.destroy();
    }
})();