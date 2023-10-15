const { sql, poolPromise } = require('../config/database');

const UserController = {
  // Add a new user
  addUser: async function (userId, password, fullname, phone, mail, role, permission) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('userId', sql.NVarChar, userId)
        .input('password', sql.NVarChar, password)
        .input('fullname', sql.NVarChar, fullname)
        .input('phone', sql.NVarChar, phone)
        .input('mail', sql.NVarChar, mail)
        .input('role', sql.NVarChar, role)
        .input('permission', sql.Int, permission)
        .query('INSERT INTO Users (userId, password, fullname, phone, mail, role, permission) VALUES (@userId, @password, @fullname, @phone, @mail, @role, @permission)');

      return result.rowsAffected[0] === 1;
    } catch (error) {
      throw new Error('Database error: ' + error.message);
    }
  },

  // Update user information
  updateUser: async function (id, updatedFields) {
    try {
      const pool = await poolPromise;
      let query = 'UPDATE Users SET ';
      const sqlParams = {
        id: sql.Int
      };

      if (updatedFields.userId !== undefined) {
        query += 'userId = @userId, ';
        sqlParams.userId = sql.VarChar;
      }

      if (updatedFields.password !== undefined) {
        query += 'password = @password, ';
        sqlParams.password = sql.VarChar;
      }

      if (updatedFields.fullname !== undefined) {
        query += 'fullname = @fullname, ';
        sqlParams.fullname = sql.VarChar;
      }

      if (updatedFields.phone !== undefined) {
        query += 'phone = @phone, ';
        sqlParams.phone = sql.Int;
      }

      if (updatedFields.mail !== undefined) {
        query += 'mail = @mail, ';
        sqlParams.mail = sql.VarChar;
      }

      if (updatedFields.role !== undefined) {
        query += 'role = @role, ';
        sqlParams.role = sql.VarChar;
      }

      if (updatedFields.permission !== undefined) {
        query += 'permission = @permission, ';
        sqlParams.permission = sql.Int;
      }

      // Remove the trailing comma and space
      query = query.slice(0, -2);

      query += ' WHERE id = @id';

      const result = await pool.request()
        .input('id', sql.Int, id);

      for (const key in updatedFields) {
        if (updatedFields.hasOwnProperty(key)) {
          result.input(key, sqlParams[key], updatedFields[key]);
        }
      }

      const updateResult = await result.query(query);

      return updateResult.rowsAffected[0] === 1;
    } catch (error) {
      throw new Error('Database error: ' + error.message);
    }
  },

  // Delete a user
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


  // Get users by a combination of criteria
  getByCriteria: async function ( userId, fullname, role, email, phone) {
    try {
      const pool = await poolPromise;
      let query = 'SELECT * FROM Users WHERE 1 = 1'; // Always true condition

      
      if (userId) {
        query += ' AND userId = @userId';
      }

      if (fullname) {
        query += ' AND fullname = @fullname';
      }

      if (role) {
        query += ' AND role = @role';
      }

      if (email) {
        query += ' AND mail LIKE @email';
      }

      if (phone) {
        query += ' AND phone LIKE @phone';
      }

      const result = await pool.request()
 
        .input('userId', sql.VarChar, userId)
        .input('fullname', sql.VarChar, fullname)
        .input('role', sql.VarChar, role)
        .input('email', sql.VarChar, `%${email}%`)
        .input('phone', sql.VarChar, `%${phone}%`)
        .query(query);

      return result.recordset;
    } catch (error) {
      throw new Error('Database error: ' + error.message);
    }
  },

};

module.exports = UserController;
