import { playerCard } from "./jsCards.js";

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
  container :document.querySelector("container"),
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
      playerCard(data);
    });
  } catch (error) {
    document.querySelector("h1").textContent = "whoops";
  }
}
getData(URL);




