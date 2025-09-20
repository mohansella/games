import fetch from "node-fetch";
import fs from "fs";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchAll() {
  let page = 1
  let games = [];

  do {
    let url = `https://gamemonetize.com/feed.php?format=0&page=${page++}`;
    console.log(`fetching ${url} after delay of 10 seconds to avoid hitting rate limit`)
    await delay(10 * 1000);
    const res = await fetch(url);
    const data = await res.json();
    if (data.length == 0) {
      break;
    }
    games.push(...data);
  } while (true)

  fs.writeFileSync("games.json", JSON.stringify(games, null, 2));
}

fetchAll();
