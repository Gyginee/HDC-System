const { sql, poolPromise } = require('../config/database');

const UserModel = {

  // Thêm người dùng mới
  addUser: async function (username, fullname, password, email, phone, role) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('username', sql.NVarChar, username)
        .input('fullname', sql.NVarChar, fullname)
        .input('password', sql.NVarChar, password)
        .input('email', sql.NVarChar, email)
        .input('phone', sql.NVarChar, phone)
        .input('role', sql.NVarChar, role)
        .query('INSERT INTO Users (username, fullname, password, email, phone, role) VALUES (@username, @fullname, @password, @email, @phone, @role)');

      return result.rowsAffected[0] === 1;
    } catch (error) {
      throw new Error('Database error: ' + error.message);
    }
  },

  // Cập nhật thông tin người dùng
  updateUser: async function (id, username, fullname, password, email, phone, role) {
    try {
      const pool = await poolPromise;
      let query = 'UPDATE Users SET ';
      const sqlParams = {
        id: sql.Int
      };

      if (username) {
        query += 'username = @username, ';
        sqlParams.username = sql.NVarChar;
      }

      if (fullname) {
        query += 'fullname = @fullname, ';
        sqlParams.fullname = sql.NVarChar;
      }

      if (password) {
        query += 'password = @password, ';
        sqlParams.password = sql.NVarChar;
      }

      if (email) {
        query += 'email = @email, ';
        sqlParams.email = sql.NVarChar;
      }

      if (phone) {
        query += 'phone = @phone, ';
        sqlParams.phone = sql.NVarChar;
      }

      if (role) {
        query += 'role = @role, ';
        sqlParams.role = sql.NVarChar;
      }

      // Remove the trailing comma and space
      query = query.slice(0, -2);

      query += ' WHERE id = @id';

      const result = await pool.request()
        .input('id', sql.Int, id)
        .input('username', sql.NVarChar, username)
        .input('fullname', sql.NVarChar, fullname)
        .input('password', sql.NVarChar, password)
        .input('email', sql.NVarChar, email)
        .input('phone', sql.NVarChar, phone)
        .input('role', sql.NVarChar, role)
        .query(query);

      return result.rowsAffected[0] === 1;
    } catch (error) {
      throw new Error('Database error: ' + error.message);
    }
  },


  // Xoá người dùng
  deleteUser: async function (id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Users WHERE id = @id');

      return result.rowsAffected[0] === 1;
    } catch (error) {
      throw new Error('Database error: ' + error.message);
    }
  },

  // Lấy thông tin người dùng theo id
  getUserById: async function (id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT id, username, fullname, password, email, phone, role FROM Users WHERE id = @id');

      return result.recordset[0];
    } catch (error) {
      throw new Error('Database error: ' + error.message);
    }
  },

  // Lấy thông tin người dùng theo username
  getUserByUsername: async function (username) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('username', sql.NVarChar, username)
        .query('SELECT id, username, fullname, password, email, phone, role FROM Users WHERE username = @username');

      return result.recordset[0];
    } catch (error) {
      throw new Error('Database error: ' + error.message);
    }
  },

};

module.exports = UserModel;
