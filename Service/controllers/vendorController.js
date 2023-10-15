const { sql, poolPromise } = require('../config/database');

const VendorController = {
  // Function to add a new vendor to the Vendors table
  addVendor: async function (vendorId, name, address, type) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('vendorId', sql.VarChar, vendorId)
      .input('name', sql.VarChar, name)
      .input('address', sql.VarChar, address)
      .input('type', sql.VarChar, type)
      .query('INSERT INTO Vendors (vendor_id, name, address, type) VALUES (@vendorId, @name, @address, @type)');

    return result.recordset;
  },

  // Function to update a vendor's information by their unique 'id'
  updateVendor: async function (id, vendorId, name, address, type) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .input('vendorId', sql.VarChar, vendorId)
      .input('name', sql.VarChar, name)
      .input('address', sql.VarChar, address)
      .input('type', sql.VarChar, type)
      .query(
        'UPDATE Vendors SET vendor_id = @vendorId, name = @name, address = @address, type = @type WHERE id = @id'
      );

    return result.rowsAffected;
  },

  // Function to delete a vendor by their unique 'id'
  deleteVendor: async function (id) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Vendors WHERE id = @id');

    return result.rowsAffected;
  },

  // Function to retrieve a list of all vendors from the Vendors table
  getAllVendors: async function () {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Vendors');

    return result.recordset;
  },

  // Function to retrieve a vendor by their unique 'id'
  getVendorById: async function (id) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Vendors WHERE id = @id');

    return result.recordset[0]; // Assuming id is unique, so we return the first result
  },

  // Other functions can be added here as needed
};

module.exports = VendorController;
