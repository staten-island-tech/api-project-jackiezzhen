const DOMSelectors = {
  error: document.querySelector(".title").textContent,
};


function raceCard(card) {
  const startTime = new Date(card.start);
  const endTime = new Date(card.end);
  const cardHTML = `
    <div class=raceCard>
    <h1>${card.name}</h1>
    <p>Start Time: ${startTime}</p>
    <p>End Time: ${endTime}</p>
    <p>Players Participated: ${card.totalScores}</p>
    <button class="leaderboard">Leaderboard</button>
    </div>
    `;
  document
    .querySelector(".raceContainer")
    .insertAdjacentHTML("beforeend", cardHTML);
   const leaderboardURL = `https://data.ninjakiwi.com/btd6/races/${card.id}/leaderboard`;
   console.log(leaderboardURL)
  const leaderboardButton = document.querySelectorAll(".leaderboard");
  leaderboardButton.forEach((button) => {
  button.addEventListener("click", callLeaderboard);});
  async function callLeaderboard(race) {
    const leaderboardContainer = document.querySelector(".leaderboardContainer")
    try {
      const leaderboardResponse = await fetch(leaderboardURL);
      if (leaderboardResponse.status !== 200) {
        throw new Error(leaderboardResponse.statusText);
      }
      console.log(leaderboardResponse);
      const leaderboardData = await leaderboardResponse.json();
      console.log(leaderboardData);
      leaderboardData.body.forEach((data) => {
        leaderboardCard(data)})
    } catch (leaderboardError) {
      DOMSelectors.error = "whoops";
    }
  };









}

function leaderboardCard(card) {
  const cardHTML = `
    <div class="leaderboardCard">
    <h1>${card.displayName}</h1>
    <p>Score: ${card.score}</p>
    <button class= profile><img src="./public/profile.webp"</button>
    </div>
  `;
  const leaderboardContainer = document.querySelector(".leaderboardContainer");
  leaderboardContainer. insertAdjacentHTML("beforeend", cardHTML);
}

function playerCard(card) {
  const cardHTML = `
      <div class="playerCard">
        <h1>${card.displayName}</h1>
        <p>Rank: ${card.score}</p>
        <p>Veteran Rank: ${card.veteranRank}</p>
        <p>Achievements: ${card.achievements}</p>
        <img src="${card.avatarURL}" alt="Avatar">
        <img src="${card.bannerURL}" alt="Banner">
      </div>
    `;

  document
    .querySelector(".playerContainer")
    .insertAdjacentHTML("beforeend", cardHTML);
}

export { raceCard, leaderboardCard, playerCard, DOMSelectors};
