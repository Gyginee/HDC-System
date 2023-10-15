const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/clientController'); // Update the path to your ClientController file

// Add a new client
router.post('/', async (req, res) => {
  const { clientId, name, address } = req.body;
  try {
    const client = await ClientController.addClient(clientId, name, address);
    res.status(200).json({ success: true, data: client });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update client information by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { clientId, name, address } = req.body;
  try {
    const result = await ClientController.updateClient(id, clientId, name, address);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a client by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await ClientController.deleteClient(id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a list of all clients
router.get('/', async (req, res) => {
  try {
    const clients = await ClientController.getAllClients();
    res.status(200).json({ success: true, data: clients });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a client by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const client = await ClientController.getClientById(id);
    res.status(200).json({ success: true, data: client });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add other routes for additional functionality as needed

module.exports = router;
