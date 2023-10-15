  const { sql, poolPromise } = require('../config/database');

  const CostProjectController = {
    // Function to add a new cost project to the CostProject table
    addCostProject: async function (project_id, id, name, type, cost, internal_cost, real_cost, status) {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('project_id', sql.VarChar, project_id)
        .input('id', sql.VarChar, id)
        .input('name', sql.VarChar, name)
        .input('type', sql.VarChar, type)
        .input('cost', sql.Float, cost)
        .input('internal_cost', sql.Float, internal_cost)
        .input('real_cost', sql.Float, real_cost)
        .input('status', sql.VarChar, status)
        .query('INSERT INTO CostProject (project_id, id, name, type, cost, internal_cost, real_cost, status) VALUES (@project_id, @id, @name, @type, @cost, @internal_cost, @real_cost, @status)');

      return result.recordset;
    },

    // Function to update a cost project's information by its unique 'id'
    updateCostProject: async function (id, project_id, name, type, cost, internal_cost, real_cost, status) {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('id', sql.VarChar, id)
        .input('project_id', sql.VarChar, project_id)
        .input('name', sql.VarChar, name)
        .input('type', sql.VarChar, type)
        .input('cost', sql.Float, cost)
        .input('internal_cost', sql.Float, internal_cost)
        .input('real_cost', sql.Float, real_cost)
        .input('status', sql.VarChar, status)
        .query(
          'UPDATE CostProject SET project_id = @project_id, name = @name, type = @type, cost = @cost, internal_cost = @internal_cost, real_cost = @real_cost, status = @status WHERE id = @id'
        );

      return result.rowsAffected;
    },

    // Function to delete a cost project by its unique 'id'
    deleteCostProject: async function (id) {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('id', sql.VarChar, id)
        .query('DELETE FROM CostProject WHERE id = @id');

      return result.rowsAffected;
    },

    // Function to retrieve a list of all cost projects from the CostProject table
    getAllCostProjects: async function () {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM CostProject');

      return result.recordset;
    },

    // Function to retrieve a cost project by its unique 'id'
    getCostProjectById: async function (id) {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('id', sql.VarChar, id)
        .query('SELECT * FROM CostProject WHERE id = @id');

      return result.recordset[0]; // Assuming 'id' is unique, so we return the first result
    },

    // Other functions can be added here as needed
  };

  module.exports = CostProjectController;
