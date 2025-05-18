const Pool = require('pg').Pool
const pool = new Pool ({
    user: 'postgres',
    password: '7281',
    host: 'localhost', // Если БД локальная
    port: 5432,
    database: 'Openhearts'
}
) 

