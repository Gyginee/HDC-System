const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Thêm người dùng mới
router.post('/', async (req, res) => {
  const { userId, password, fullname, phone, mail, role, permission } = req.body;

  // Set the default value for permission if it's not provided
  const userPermission = permission !== undefined ? permission : 0;

  try {
    const user = await UserController.addUser(userId, password, fullname, phone, mail, role, userPermission);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Cập nhật thông tin người dùng
router.put('/id=:id', async (req, res) => {
  const id = req.params.id;
  const { userId, password, fullname, phone, mail, role, permission } = req.body;

  try {
    // Create an object to store the fields that need to be updated
    const updatedFields = {};
    if (userId !== undefined) updatedFields.userId = userId;
    if (password !== undefined) updatedFields.password = password;
    if (fullname !== undefined) updatedFields.fullname = fullname;
    if (phone !== undefined) updatedFields.phone = phone;
    if (mail !== undefined) updatedFields.mail = mail;
    if (role !== undefined) updatedFields.role = role;
    if (permission !== undefined) updatedFields.permission = permission;

    const user = await UserController.updateUser(id, updatedFields);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Xoá người dùng
router.delete('/id=:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserController.deleteUser(userId);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lấy toàn bộ thông tin người dùng
router.get('', async (req, res) => {
  try {
    const users = await UserController.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lấy thông tin người dùng theo id
router.get('/id=:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserController.getUserById(userId);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lấy thông tin người dùng theo userId
router.get('/userId=:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await UserController.getUserByUserId(userId);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tìm kiếm người dùng theo các tiêu chí (bao gồm userId)
router.get('/search', async (req, res) => {
  const { userId, fullname, role, email, phone } = req.query;

  // Check if any search criteria are provided
  if (!userId && !fullname && !role && !email && !phone) {
    return res.status(400).json({ error: "No search criteria provided" });
  }

  try {
    const users = await UserController.getByCriteria(userId, fullname, role, email, phone);
    
    // Check if the result is empty, and if so, return an empty response
    if (users.length === 0) {
      return res.status(404).json({ message: "No matching users found" });
    }

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
