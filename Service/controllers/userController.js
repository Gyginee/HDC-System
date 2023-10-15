const { sql, poolPromise } = require('../config/db');

const UserController = {
  getUserById: async function (req, res) {
    const userId = req.params.id;
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, userId)
        .query('SELECT * FROM Users WHERE id = @id');
      
      const user = result.recordset[0];
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  /* Xử lý thêm user */
  addUser: async function (req, res) {
    const { username, password, email, phone, role } = req.body;
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .input('email', sql.NVarChar, email)
        .input('phone', sql.NVarChar, phone)
        .input('role', sql.NVarChar, role)
        .query('INSERT INTO Users (username, password, email, phone, role) VALUES (@username, @password, @email, @phone, @role)');
      
      const success = result.rowsAffected[0] === 1;
      res.json({ success });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  /* Xử lý sửa user */
  updateUser: async function (req, res) {
    const userId = req.params.id;
    const { username, password, email, phone, role } = req.body;
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, userId)
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .input('email', sql.NVarChar, email)
        .input('phone', sql.NVarChar, phone)
        .input('role', sql.NVarChar, role)
        .query('UPDATE Users SET username = @username, password = @password, email = @email, phone = @phone, role = @role WHERE id = @id');
      
      const success = result.rowsAffected[0] === 1;
      res.json({ success });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  /* Xử lý xoá user */
  deleteUser: async function (req, res) {
    const userId = req.params.id;
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, userId)
        .query('DELETE FROM Users WHERE id = @id');
      
      const success = result.rowsAffected[0] === 1;
      res.json({ success });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /* Xử lý đăng nhập */
  login: async function (req, res) {
    const { username, password } = req.body;
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .query('SELECT * FROM Users WHERE username = @username AND password = @password');
      
      const user = result.recordset[0];
      if (user) {
        res.json({ success: true, user });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

   // Tìm kiếm người dùng theo tên tài khoản
   searchByUsername: async function (req, res) {
    const { username } = req.query;
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('username', sql.NVarChar, `%${username}%`)
        .query('SELECT * FROM Users WHERE username LIKE @username');
      
      const users = result.recordset;
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

   // Tìm kiếm người dùng theo fullname
   searchByFullname: async function (fullname) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('fullname', sql.NVarChar, `%${fullname}%`)
        .query('SELECT * FROM Users WHERE fullname LIKE @fullname');
      
      const users = result.recordset;
      return users;
    } catch (error) {
      throw new Error('Database error: ' + error.message);
    }
  },

  // Tìm kiếm người dùng theo vai trò (role)
  searchByRole: async function (req, res) {
    const { role } = req.query;
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('role', sql.NVarChar, role)
        .query('SELECT * FROM Users WHERE role = @role');
      
      const users = result.recordset;
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Tìm kiếm người dùng theo email
  searchByEmail: async function (req, res) {
    const { email } = req.query;
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('email', sql.NVarChar, `%${email}%`)
        .query('SELECT * FROM Users WHERE email LIKE @email');
      
      const users = result.recordset;
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Tìm kiếm người dùng theo số điện thoại
  searchByPhone: async function (req, res) {
    const { phone } = req.query;
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('phone', sql.NVarChar, `%${phone}%`)
        .query('SELECT * FROM Users WHERE phone LIKE @phone');
      
      const users = result.recordset;
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};

module.exports = UserController;
