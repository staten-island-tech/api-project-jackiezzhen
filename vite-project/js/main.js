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
  cardHTML= `
  Name: ${data.name}
  Start Time: ${startTime}
  End Time: ${endTime}
  `
}
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
    data.body.forEach(data => {
      console.log(data)
      console.log(data.id)
      console.log(data.end)
      console.log(data.id)
  /* const startTime = new Date(data.start)
  const endTime = new Date(data.end)
  data.body.forEach((data) => data.container.insertAdjacentHTML("beforeend", cardHTML)); */
    });
  } catch (error) {
    document.querySelector("h1").textContent = `Sorry, I cannot find ${text}`;
  }
}
getData(URL);




