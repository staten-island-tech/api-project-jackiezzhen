import { playerCard } from "./jsCards";
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
  dataid: document.querySelector("h1").textContent,
  container :document.querySelector("container"),
}

// Race API
const raceURL = "https://data.ninjakiwi.com/btd6/races";
/* const leaderboardURL = `https://data.ninjakiwi.com/btd6/races/${data.id}/leaderboard` */

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
      playerCard(data)
    });
  } catch (error) {
    document.querySelector("h1").textContent = "whoops";
  }
}

getData(raceURL);




