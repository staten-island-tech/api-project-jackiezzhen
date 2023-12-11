function playerCard(card) {
    const startTime = new Date(card.start);
    const endTime = new Date(card.end);
    const cardHTML= `
    <div class=card>
    <h1>${card.name}</h1>
    <p>Start Time: ${startTime}</p>
    <p>End Time: ${endTime}</p>
    <p>Players Participated: ${card.totalScores}</p>
    <button class= leaderboard>Leaderboard</button>
    <a href="https://data.ninjakiwi.com/btd6/races/${card.id}/leaderboard">Leaderboard</a>
    </div>
    `
    document.querySelector(".container").insertAdjacentHTML("beforeend", cardHTML);
}
export { playerCard } 