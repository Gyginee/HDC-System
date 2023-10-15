const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/projectController'); // Replace 'path-to-ProjectController' with the actual path to your ProjectController file

// Add a new project
router.post('/', async (req, res) => {
  const { projectId, name, dayCreated, cost, status } = req.body;
  try {
    const project = await ProjectController.addProject(projectId, name, dayCreated, cost, status);
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update project information by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { projectId, name, dayCreated, cost, status } = req.body;
  try {
    const result = await ProjectController.updateProject(id, projectId, name, dayCreated, cost, status);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a project by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await ProjectController.deleteProject(id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a list of all projects
router.get('/', async (req, res) => {
  try {
    const projects = await ProjectController.getAllProjects();
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a project by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const project = await ProjectController.getProjectById(id);
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add other routes for additional functionality as needed

module.exports = router;
