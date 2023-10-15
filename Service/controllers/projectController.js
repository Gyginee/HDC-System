const { sql, poolPromise } = require('../config/database');

const ProjectController = {
  // Function to add a new project to the Projects table
  addProject: async function (projectId, name, dayCreated, cost, status) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('projectId', sql.VarChar, projectId)
      .input('name', sql.VarChar, name)
      .input('dayCreated', sql.VarChar, dayCreated)
      .input('cost', sql.Float, cost)
      .input('status', sql.VarChar, status)
      .query('INSERT INTO Projects (project_id, name, day_created, cost, status) VALUES (@projectId, @name, @dayCreated, @cost, @status)');

    return result.recordset;
  },

  // Function to update a project's information by its unique 'id'
  updateProject: async function (id, projectId, name, dayCreated, cost, status) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .input('projectId', sql.VarChar, projectId)
      .input('name', sql.VarChar, name)
      .input('dayCreated', sql.VarChar, dayCreated)
      .input('cost', sql.Float, cost)
      .input('status', sql.VarChar, status)
      .query(
        'UPDATE Projects SET project_id = @projectId, name = @name, day_created = @dayCreated, cost = @cost, status = @status WHERE id = @id'
      );

    return result.rowsAffected;
  },

  // Function to delete a project by its unique 'id'
  deleteProject: async function (id) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Projects WHERE id = @id');

    return result.rowsAffected;
  },

  // Function to retrieve a list of all projects from the Projects table
  getAllProjects: async function () {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Projects');

    return result.recordset;
  },

  // Function to retrieve a project by its unique 'id'
  getProjectById: async function (id) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Projects WHERE id = @id');

    return result.recordset[0]; // Assuming id is unique, so we return the first result
  },

  // Other functions can be added here as needed
};

module.exports = ProjectController;
