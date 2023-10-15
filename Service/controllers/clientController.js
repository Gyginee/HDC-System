const { sql, poolPromise } = require('../config/database');

const ClientController = {
  // Function to add a new client to the Clients table
  addClient: async function (clientId, name, address) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('clientId', sql.VarChar, clientId)
      .input('name', sql.VarChar, name)
      .input('address', sql.VarChar, address)
      .query('INSERT INTO Clients (client_id, name, address) VALUES (@clientId, @name, @address)');

    return result.recordset;
  },

  // Function to update a client's information by their unique 'id'
  updateClient: async function (id, clientId, name, address) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .input('clientId', sql.VarChar, clientId)
      .input('name', sql.VarChar, name)
      .input('address', sql.VarChar, address)
      .query(
        'UPDATE Clients SET client_id = @clientId, name = @name, address = @address WHERE id = @id'
      );

    return result.rowsAffected;
  },

  // Function to delete a client by their unique 'id'
  deleteClient: async function (id) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Clients WHERE id = @id');

    return result.rowsAffected;
  },

  // Function to retrieve a list of all clients from the Clients table
  getAllClients: async function () {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Clients');

    return result.recordset;
  },

  // Function to retrieve a client by their unique 'id'
  getClientById: async function (id) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Clients WHERE id = @id');

    return result.recordset[0]; // Assuming id is unique, so we return the first result
  },

  // Other functions can be added here as needed

};

module.exports = ClientController;
