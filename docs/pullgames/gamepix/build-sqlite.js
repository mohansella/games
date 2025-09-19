import fs from "fs";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function build() {
  const inputFile = "games.json";   // your 12 MB JSON file
  const dbFile = "games.db";        // output SQLite file

  // load JSON
  const raw = fs.readFileSync(inputFile, "utf-8");
  const data = JSON.parse(raw);

  // open sqlite (file)
  const db = await open({
    filename: dbFile,
    driver: sqlite3.Database
  });

  // drop old table if exists
  await db.exec("DROP TABLE IF EXISTS games");

  // create table
  await db.exec(`
    CREATE TABLE games (
      id TEXT PRIMARY KEY,
      title TEXT,
      namespace TEXT,
      description TEXT,
      category TEXT,
      orientation TEXT,
      quality_score REAL,
      width INTEGER,
      height INTEGER,
      date_modified TEXT,
      date_published TEXT,
      banner_image TEXT,
      image TEXT,
      url TEXT
    )
  `);

  // create indexes for faster search
  await db.exec("CREATE INDEX idx_title ON games(title)");
  await db.exec("CREATE INDEX idx_category ON games(category)");
  await db.exec("CREATE INDEX idx_namespace ON games(namespace)");
  await db.exec("CREATE INDEX idx_orientation ON games(orientation)");
  await db.exec("CREATE INDEX idx_quality ON games(quality_score)");

  // insert all rows
  const insert = await db.prepare(`
    INSERT INTO games
      (id, title, namespace, description, category, orientation,
       quality_score, width, height, date_modified, date_published,
       banner_image, image, url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  var count = 0;
  for (const g of data) {

    //games selected criteria
    if(g.quality_score < 0.8) {
      continue;
    }

    count++;
    await insert.run(
      g.id,
      g.title,
      g.namespace,
      g.description,
      g.category,
      g.orientation,
      g.quality_score,
      g.width,
      g.height,
      g.date_modified,
      g.date_published,
      g.banner_image,
      g.image,
      g.url
    );
  }

  await insert.finalize();
  await db.close();

  console.log(`✅ Done. Saved ${count} games into ${dbFile}`);
}

build();
