import app from "../server/server.cjs";
import database from "../server/database.cjs";

const { initializeDatabase } = database;

let databaseReady;

export default async function handler(req, res) {
  try {
    if (!databaseReady) {
      databaseReady = initializeDatabase();
    }

    await databaseReady;
    return app(req, res);
  } catch (error) {
    console.error("Database startup failed:", error);
    return res.status(500).json({
      message: "Backend initialization failed.",
    });
  }
}