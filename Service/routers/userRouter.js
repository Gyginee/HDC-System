/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Get a user based on their unique ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Add a new user
 *     description: Add a new user with the provided details
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               fullname:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *             example:
 *               username: john_doe
 *               fullname: John Doe
 *               password: password123
 *               email: john@example.com
 *               phone: 1234567890
 *               role: user
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *             example:
 *               success: true
 *       500:
 *         description: Error while adding the user
 */

// ... Other routes



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
  const { username, fullname, password, email, phone, role } = req.body;
  try {
    const success = await UserModel.addUser(username, fullname, password, email, phone, role);
    res.json({ success });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cập nhật thông tin người dùng
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, fullname, password, email, phone, role } = req.body;
  try {
    const success = await UserModel.updateUser(userId, username, fullname, password, email, phone, role);
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
