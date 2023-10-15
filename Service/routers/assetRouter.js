const express = require('express');
const router = express.Router();
const AssetsController = require('../controllers/assetController'); // Replace 'path-to-AssetsController' with the actual path to your AssetsController file

// Add a new asset
router.post('/', async (req, res) => {
  const { type, name, assetId, price, date, grantStaff, status } = req.body;
  try {
    const asset = await AssetsController.addAsset(type, name, assetId, price, date, grantStaff, status);
    res.status(200).json({ success: true, data: asset });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update asset information by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { type, name, assetId, price, date, grantStaff, status } = req.body;
  try {
    const result = await AssetsController.updateAsset(id, type, name, assetId, price, date, grantStaff, status);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an asset by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await AssetsController.deleteAsset(id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a list of all assets
router.get('/', async (req, res) => {
  try {
    const assets = await AssetsController.getAllAssets();
    res.status(200).json({ success: true, data: assets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get an asset by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const asset = await AssetsController.getAssetById(id);
    res.status(200).json({ success: true, data: asset });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add other routes for additional functionality as needed

module.exports = router;
