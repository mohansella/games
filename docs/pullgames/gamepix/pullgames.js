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
