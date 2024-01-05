const DOMSelectors = {
  error: document.querySelector(".title").textContent,
  back: document.querySelector(".leaderboardBackButton"),
  leaderboardContainer: document.querySelector(".leaderboardContainer"),
};

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
      document.querySelector(".leaderboardBackButton").style.display = "inline-block";
    } catch (leaderboardError) {
      DOMSelectors.error = "whoops";
    }
  }
}
  //Player
  async function callPlayer(button) {
    const raceID = button.parentElement.querySelector(".ID").textContent;
    playerContainer.innerHTML = "";

    const backButtonHTML = `
    <button class="profile" id="leaderboardBackButton">
      <img src="/public/profile.webp" alt="Back">
    </button>
  `;
    DOMSelectors.leaderboardContainer.insertAdjacentHTML(
      "beforeend",
      backButtonHTML
    );
    const playerURL = `https://data.ninjakiwi.com/btd6/races/${raceID}/leaderboard`;
    try {
      const leaderboardResponse = await fetch(playerURL);
      if (leaderboardResponse.status !== 200) {
        throw new Error(leaderboardResponse.statusText);
      }
      const leaderboardData = await leaderboardResponse.json();
      leaderboardData.body.forEach((data) => {
        leaderboardCard(data);
      });
      document.querySelector(".leaderboardBackButton").style.display =
        "inline-block";
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
export { DOMSelectors, raceCard };
