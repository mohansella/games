// save as importGames.js
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

// open database
const db = new sqlite3.Database("games.db");

// read JSON file
const gamesData = JSON.parse(fs.readFileSync("games.json", "utf8"));

// create table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS games (
      id TEXT PRIMARY KEY,
      title TEXT,
      description TEXT,
      instructions TEXT,
      url TEXT,
      category TEXT,
      tags TEXT,
      thumb TEXT,
      width INTEGER,
      height INTEGER
    )
  `);

  const stmt = db.prepare(`
    INSERT OR REPLACE INTO games 
    (id, title, description, instructions, url, category, tags, thumb, width, height) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  var limit = 1000;
  gamesData.forEach(game => {

    //games selected criteria
    if (limit-- <= 0 || game.width > game.height) {
      return;
    }

    stmt.run([
      game.id,
      game.title,
      game.description,
      game.instructions,
      game.url,
      game.category,
      game.tags,
      game.thumb,
      parseInt(game.width) || null,
      parseInt(game.height) || null,
    ]);
  });

  stmt.finalize();
});

// close db
db.close(() => {
  console.log("✅ Games imported into games.db");
});
