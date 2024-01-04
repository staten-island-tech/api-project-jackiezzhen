import {api} from "./jsCards.js";
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
      raceCard(data);
    });
    //Display Error
  } catch (error) {
    DOMSelectors.error = "whoops";
  }
}

getData(raceURL);
