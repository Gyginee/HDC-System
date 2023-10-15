const { sql, poolPromise } = require('../config/database');

const AssetsController = {
  // Function to add a new asset to the Assets table
  addAsset: async function (type, name, assetId, price, date, grantStaff, status) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('type', sql.VarChar, type)
      .input('name', sql.VarChar, name)
      .input('assetId', sql.VarChar, assetId)
      .input('price', sql.Float, price)
      .input('date', sql.Date, date)
      .input('grantStaff', sql.VarChar, grantStaff)
      .input('status', sql.VarChar, status)
      .query('INSERT INTO Assets (type, name, asset_id, price, date, grant_staff, status) VALUES (@type, @name, @assetId, @price, @date, @grantStaff, @status)');

    return result.recordset;
  },

  // Function to update an asset's information by its unique 'id'
  updateAsset: async function (id, type, name, assetId, price, date, grantStaff, status) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .input('type', sql.VarChar, type)
      .input('name', sql.VarChar, name)
      .input('assetId', sql.VarChar, assetId)
      .input('price', sql.Float, price)
      .input('date', sql.Date, date)
      .input('grantStaff', sql.VarChar, grantStaff)
      .input('status', sql.VarChar, status)
      .query(
        'UPDATE Assets SET type = @type, name = @name, asset_id = @assetId, price = @price, date = @date, grant_staff = @grantStaff, status = @status WHERE id = @id'
      );

    return result.rowsAffected;
  },

  // Function to delete an asset by its unique 'id'
  deleteAsset: async function (id) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Assets WHERE id = @id');

    return result.rowsAffected;
  },

  // Function to retrieve a list of all assets from the Assets table
  getAllAssets: async function () {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Assets');

    return result.recordset;
  },

  // Function to retrieve an asset by its unique 'id'
  getAssetById: async function (id) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Assets WHERE id = @id');

    return result.recordset[0]; // Assuming 'id' is unique, so we return the first result
  },

  // Other functions can be added here as needed
};

module.exports = AssetsController;
