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

function playerCard(card) {
  const startTime = new Date(card.start);
  const endTime = new Date(card.end);
  const cardHTML= `
  <h1>Name: ${card.name}</h1>
  <p>Start Time: ${startTime}</p>
  <p>End Time: ${endTime}</p>
  <p>Players Participated: ${card.totalScores}</p>
  <link>Leaderboard: ${card.leaderboard}</link>
  `
  document.querySelector(".container").insertAdjacentHTML("beforeend", cardHTML);
}
//REST API
const URL = "https://data.ninjakiwi.com/btd6/races";
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
      console.log(data.id);
      console.log(data.end);
    });
    data.body.forEach((data) => {
      playerCard(data)
    });
  } catch (error) {
    document.querySelector("h1").textContent = "whoops";
  }
}
getData(URL);




