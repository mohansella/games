Below are the steps to load all the games from gamepix.com

 1. Signup in my.gamepix.com
 2. Update the ads.txt by creating property. This may not be necessory for prototype
 3. copy below code into `main.js` in a folder and also add `npm install node-fetch` and finally run `node main.js` to fetch all the games and save in `games.json` file

```js
import fetch from "node-fetch";
import fs from "fs";

async function fetchAll() {
  let url = "https://feeds.gamepix.com/v2/json?sid=1OOOO&pagination=96&page=1";
  let games = [];

  while (url) {
    const res = await fetch(url);
    const data = await res.json();
    games.push(...data.items);
    url = data.next_url;
  }

  fs.writeFileSync("games.json", JSON.stringify(games, null, 2));
}

fetchAll();
```
