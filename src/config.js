export const options = {
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: './DB/ecommerce.sqlite'
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'coderhouse'
        }
    },
    mysql: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'my_db_clase16',
            pot: 3306
        }
    } 
}