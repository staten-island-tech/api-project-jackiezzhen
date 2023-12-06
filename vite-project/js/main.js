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
//REST API
const URL = "https://data.ninjakiwi.com/btd6/races";
async function getData(URL) {
  let text = "anything";
  try {
    const response = await fetch(URL);
    if (response.status != 200) {
      throw new Error(response.statusText);
    }
    console.log(response);
    const data = await response.json();
    console.log(data);
    document.querySelector("h1").textContent = data.id;
    document.querySelector("h2").textContent = data.metadata;
  } catch (error) {
    document.querySelector("h1").textContent = `Sorry, I cannot find ${text}`;
  }
}
getData(URL);
