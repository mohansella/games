Below are the steps to download all games from gamemontize.com

 1. run `npm install node-fetch sqlite3 sqlite`
 2. run `node pullgames.js` to fetch 35K+ games into `games.json`
 3. run `node build-sqlite.js` to organize selected games by changing the criteria under the line `//games selected criteria`. sqlite file will be created in `games.db`
