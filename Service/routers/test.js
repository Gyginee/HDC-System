/**
 * @swagger
 * /api/users/{id}
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/api/users', (req, res) => {
    // Your route logic here
    res.status(200).json({ message: 'Success' });
  });


