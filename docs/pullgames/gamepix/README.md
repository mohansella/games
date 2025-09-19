Below are the steps to load all the games from gamepix.com

 1. Signup in my.gamepix.com
 2. Update the ads.txt by creating property. This may not be necessory for prototype
 3. install npm depdencies `npm install node-fetch sqlite3 sqlite`
 4. run `node pullgames.js` to fetch all the games. lists will be saved in `games.json` file
 5. run `node build-sqlite.js` to organize selected games by chaning the criteria under the line `//games selected criteria`. sqlite file will be created in `games.db`

