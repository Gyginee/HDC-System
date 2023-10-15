const express = require('express');
const router = express.Router();
const VendorController = require('../controllers/vendorController'); // Replace 'path-to-VendorController' with the actual path to your VendorController file

// Add a new vendor
router.post('/', async (req, res) => {
  const { vendorId, name, address, type } = req.body;
  try {
    const vendor = await VendorController.addVendor(vendorId, name, address, type);
    res.status(200).json({ success: true, data: vendor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update vendor information by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { vendorId, name, address, type } = req.body;
  try {
    const result = await VendorController.updateVendor(id, vendorId, name, address, type);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a vendor by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await VendorController.deleteVendor(id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a list of all vendors
router.get('/', async (req, res) => {
  try {
    const vendors = await VendorController.getAllVendors();
    res.status(200).json({ success: true, data: vendors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a vendor by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const vendor = await VendorController.getVendorById(id);
    res.status(200).json({ success: true, data: vendor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add other routes for additional functionality as needed

module.exports = router;
