const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('new_notes.db');

module.exports = db;


