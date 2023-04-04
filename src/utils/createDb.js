import { join, dirname } from "path";
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { fileURLToPath } from "url";


// Use JSON file for storage
const file = "/db.json";
const adapter = new JSONFile(file);
const db = new Low(adapter);

export { db };
