import { raceCard, leaderboardCard, playerCard } from "./jsCards.js";
/* function greet(name){
    const greetPromise= new Promise(function(resolve, reject){
        resolve(`Hello ${name}`);
    })
    return greetPromise;
}
const Aaron = greet("Aaron");
console.log(Aaron);
//handle the promise
Aaron.then((result)=>{
    console.log(result);
})
 */
const DOMSelectors = {
  error: document.querySelector(".title").textContent,
};
// Race API
const raceURL = "https://data.ninjakiwi.com/btd6/races";

async function getData(URL) {
  try {
    const response = await fetch(URL);
    if (response.status != 200) {
      throw new Error(response.statusText);
    }
    console.log(response);
    const data = await response.json();
    console.log(data);
    data.body.forEach((data) => {
      console.log(data);
      raceCard(data);
    });
    data.body.forEach(async (race) => {
      const leaderboardURL = `https://data.ninjakiwi.com/btd6/races/${race.id}/leaderboard`;

      try {
        const leaderboardResponse = await fetch(leaderboardURL);
        if (leaderboardResponse.status !== 200) {
          throw new Error(leaderboardResponse.statusText);
        }
        console.log(leaderboardResponse);
        const leaderboardData = await leaderboardResponse.json();
        console.log(leaderboardData);
        leaderboardData.body.forEach((data) => {
          console.log(data);
          leaderboardCard(data)})
      } catch (leaderboardError) {
        DOMSelectors.error = "whoops";
      }
    });
    data.body.forEach(async (race) => {
      const metadataURL = `https://data.ninjakiwi.com/btd6/races/${race.id}/metadata`;

      try {
        const leaderboardResponse = await fetch(leaderboardURL);
        if (leaderboardResponse.status !== 200) {
          throw new Error(leaderboardResponse.statusText);
        }
        console.log(leaderboardResponse);
        const metadataData = await leaderboardResponse.json();
        console.log(metadataData);
        metadataData.body.forEach((data) => {
          console.log(data);
          metadataCard(data)})
      } catch (leaderboardError) {
        DOMSelectors.error = "whoops";
      }
    });
    //Display Error
  } catch (error) {
    DOMSelectors.error = "whoops";
  }
}

getData(raceURL);
