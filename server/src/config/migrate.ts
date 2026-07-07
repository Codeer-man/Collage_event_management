import path from "node:path";
import fs from "fs";
import { fileURLToPath } from "node:url";
import { pool } from "./pool.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
  const migrationPath = path.join(__dirname, "../migrations/faculty.sql");

  const readFile = fs.readFileSync(migrationPath, "utf-8");

  try {
    await pool.query(readFile);
    console.log("Migration completed successfully ");
  } catch (error) {
    console.error("Migration failed", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();
