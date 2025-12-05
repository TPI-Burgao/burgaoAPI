import mysql, { Connection, QueryError } from 'mysql2';

const dbConfig = {
    host: 'mysql.railway.internal',
    port: 3306,
    user: 'root',
    password: 'BVgbSrfgxcIRMjmyTbPlNLDXUiAApenj',
    database: 'railway'
};

const mysqlConnection: Connection = mysql.createConnection(dbConfig);

mysqlConnection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ', err);
        throw err;
    }

    console.log('Conexao bem-sucedida com o banco de dados MYSQL');
})

export function executarSQL(query: string, valores: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(query, valores, (err, resultado) => {
            if (err) {
                console.error('Erro ao executar a query.', err);
                reject(err);
            }
            resolve(resultado);
        });
    });
}