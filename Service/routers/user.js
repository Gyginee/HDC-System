const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');

// Lấy thông tin người dùng theo id
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Thêm người dùng mới
router.post('/', async (req, res) => {
  const { username, password, email, phone, role } = req.body;
  try {
    const success = await UserModel.addUser(username, password, email, phone, role);
    res.json({ success });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cập nhật thông tin người dùng
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, password, email, phone, role } = req.body;
  try {
    const success = await UserModel.updateUser(userId, username, password, email, phone, role);
    res.json({ success });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Xoá người dùng
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const success = await UserModel.deleteUser(userId);
    res.json({ success });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
