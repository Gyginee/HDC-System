const { sql, poolPromise } = require('../config/database');

const AuthController = {
    /* Xử lý đăng nhập */
    login: async function (req, res) {
        const { username, password } = req.body;
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('username', sql.NVarChar, username)
                .input('password', sql.NVarChar, password)
                .query('SELECT * FROM Users WHERE username = @username AND password = @password');

            const auth = result.recordset[0];
            if (auth) {
                res.json({ success: true, auth });
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
}

module.exports = AuthController;