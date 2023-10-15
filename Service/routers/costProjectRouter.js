const express = require('express');
const router = express.Router();
const CostProjectController = require('../controllers/costProjectController'); // Replace 'path-to-CostProjectController' with the actual path to your CostProjectController file

// Add a new cost project
router.post('/', async (req, res) => {
  const { project_id, id, name, type, cost, internal_cost, real_cost, status } = req.body;
  try {
    const costProject = await CostProjectController.addCostProject(project_id, id, name, type, cost, internal_cost, real_cost, status);
    res.status(200).json({ success: true, data: costProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update cost project information by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { project_id, name, type, cost, internal_cost, real_cost, status } = req.body;
  try {
    const result = await CostProjectController.updateCostProject(id, project_id, name, type, cost, internal_cost, real_cost, status);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a cost project by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await CostProjectController.deleteCostProject(id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a list of all cost projects
router.get('/', async (req, res) => {
  try {
    const costProjects = await CostProjectController.getAllCostProjects();
    res.status(200).json({ success: true, data: costProjects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a cost project by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const costProject = await CostProjectController.getCostProjectById(id);
    res.status(200).json({ success: true, data: costProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add other routes for additional functionality as needed

module.exports = router;
