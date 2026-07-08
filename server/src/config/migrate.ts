import path from "node:path";
import fs from "fs";
import { fileURLToPath } from "node:url";
import { pool } from "./pool.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
  //get the folder
  const migrationDir = path.join(__dirname, "../migrations");
  //get the files present in the folder
  const files = fs.readdirSync(migrationDir).sort();
  try {
    // read all the file sync and migrate to the db
    for (const file of files) {
      const filePath = path.join(migrationDir, file);
      const sql = fs.readFileSync(filePath, "utf-8");
      console.log(`Running migration: ${file}`);
      await pool.query(sql);
    }

    console.log("Migration completed successfully ");
  } catch (error) {
    console.error("Migration failed", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();
