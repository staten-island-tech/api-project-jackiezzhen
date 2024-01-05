const DOMSelectors = {
  error: document.querySelector(".title").textContent,
  back: document.querySelector(".leaderboardBackButton"),
  leaderboardContainer: document.querySelector(".leaderboardContainer"),
};
//Maps
async function raceCard(card) {
  const startTime = new Date(card.start);
  const endTime = new Date(card.end);
  const metadataURL = `https://data.ninjakiwi.com/btd6/races/${card.id}/metadata`;
  const metadataResponse = await fetch(metadataURL);
  const metadata = await metadataResponse.json();
  const mapURL = metadata.body.mapURL;
  const cardHTML = `
    <div class=raceCard>
    <h1>${card.name}</h1>
    <p>Start Time: ${startTime}</p>
    <p>End Time: ${endTime}</p>
    <img class= mapImg src="${mapURL}" alt="Race Map">
    <p>Players Participated: ${card.totalScores}</p>
    <button class="leaderboard">Leaderboard</button>
    <p class=ID>${card.id}</p>
    </div>
    `;
  document
    .querySelector(".raceContainer")
    .insertAdjacentHTML("beforeend", cardHTML);

  const leaderboardButtons = document.querySelectorAll(".leaderboard");
  leaderboardButtons.forEach((button) => {
    button.addEventListener("click", () => callLeaderboard(button));
  });

  //Leaderboard
  async function callLeaderboard(button) {
    const raceID = button.parentElement.querySelector(".ID").textContent;
    document.querySelector(".leaderboardContainer").innerHTML = "";
    const leaderboardURL = `https://data.ninjakiwi.com/btd6/races/${raceID}/leaderboard`;
    try {
      const leaderboardResponse = await fetch(leaderboardURL);
      if (leaderboardResponse.status !== 200) {
        throw new Error(leaderboardResponse.statusText);
      }
      const leaderboard = await leaderboardResponse.json();
      const leaderboardData = leaderboard.body.reverse();
      leaderboardData.forEach((data) => {
        leaderboardCard(data);
      });
    } catch (leaderboardError) {
      DOMSelectors.error = "whoops";
    }
  }
  function leaderboardCard(card) {
    const cardHTML = `
    <div class="leaderboardCard">
      <h1 class=leaderboardDisplayName>${card.displayName}</h1>
      <p class=leaderboardScore>Score: ${card.score}</p>
      <p class=profileID>${card.profile}<p>
      <button class=profile><img src="public/profile.webp" alt="Profile"></button>
    </div>
  `;
    document
      .querySelector(".leaderboardContainer")
      .insertAdjacentHTML("beforeend", cardHTML);
      const playerButtons = document.querySelectorAll(".leaderboard");
      playerButtons.forEach((button) => {
        button.addEventListener("click", () => callPlayer(button));
      });
  }

  //Player
  async function callPlayer(button) {
    const playerID = button.parentElement.querySelector(".profileID").textContent;
    playerContainer.innerHTML = "";
    DOMSelectors.leaderboardContainer.insertAdjacentHTML("beforeend",backButtonHTML);
    const playerURL = `https://data.ninjakiwi.com/btd6/users/${playerID}`;
    try {
      const playerResponse = await fetch(playerURL);
      if (playerResponse.status !== 200) {
        throw new Error(playerResponse.statusText);
      }
      const playerData = await playerResponse.json();
      playerData.body.forEach((data) => {
        playerCard(data);
      });
    } catch (leaderboardError) {
      DOMSelectors.error = "whoops";
    }
  }

  async function playerCard(card) {
    const metadataURL = `https://data.ninjakiwi.com/btd6/races/${card.id}/metadata`;
    const metadataResponse = await fetch(metadataURL);
    const metadata = await metadataResponse.json();
    const mapURL = metadata.body.mapURL;
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
}

export { DOMSelectors, raceCard };
