const app = require("../server/server.cjs");
const { initializeDatabase } = require("../server/database.cjs");

let databaseReady;

module.exports = async (req, res) => {
  try {
    if (!databaseReady) databaseReady = initializeDatabase();
    await databaseReady;
    return app(req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Backend initialization failed." });
  }
};
