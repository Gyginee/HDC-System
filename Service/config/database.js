const sql = require('mssql');
const config = {
  user: 'hd',
  password: 'Hd@123456',
  server: '103.90.227.186',
  database: 'HDC_System',
  options: {
    encrypt: true,
    trustServerCertificate: true // Cho phép chấp nhận chứng chỉ tự ký
  }
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
