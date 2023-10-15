const sql = require('mssql');
const config = {
  user: 'hd',
  password: 'hd@123',
  server: 'HDC',
  database: 'hdcsystem',
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch((err) => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
  sql,
  poolPromise,
};
