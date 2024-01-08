const DOMSelectors = {
  error: document.querySelector(".title").textContent,
  raceContainer: document.querySelector(".raceContainer"),
  leaderboardContainer: document.querySelector(".leaderboardContainer"),
  playerContainer: document.querySelector(".playerContainer"),
};
//Back Button
function leaderboardBackButton() {}
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
    button.addEventListener("click", () => {
      callLeaderboard(button);
      DOMSelectors.leaderboardContainer.style.display = "flex";
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      const backButtonHTML = `<button class="backButton"><img class=backButtonImg src="public/back-arrow.png" alt="Back"></button>`;
      document
        .querySelector(".leaderboardContainer")
        .insertAdjacentHTML("afterbegin", backButtonHTML);
      const backButton = document.querySelector(".backButton");
      backButton.addEventListener("click", () => {
        location.reload();
      });
    });
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
  async function leaderboardCard(card) {
    const profileURL = card.profile;
    try {
      const profileResponse = await fetch(profileURL);
      if (profileResponse.status !== 200) {
        throw new Error(profileResponse.statusText);
      }
      const profileData = await profileResponse.json();
      const avatarURL = profileData.body.avatarURL;
      const bannerURL = profileData.body.bannerURL;
      const cardHTML = `
    <div class="leaderboardCard">
      <p class=leaderboardDisplayName>${card.displayName}</p>
      <p class=leaderboardScore>Score: ${card.score}</p>
      <img class= avatar src="${avatarURL}" alt="Avatar">
      <img class= banner src="${bannerURL}" alt="Banner">
      <p class=profileID>${card.profile}</p>
      <button class="profile"><img src="public/profile.webp" alt="Profile"></button>
    </div>
    
  `;
      document
        .querySelector(".leaderboardContainer")
        .insertAdjacentHTML("beforeend", cardHTML);
      const playerButtons = document.querySelectorAll(".leaderboard");
      playerButtons.forEach((button) => {
        button.addEventListener("click", () => callPlayer(button));
      });
    } catch (leaderboardError) {
      DOMSelectors.error = "whoops";
    }
  }

  //Player
  async function callPlayer(button) {
    const playerID =
      button.parentElement.querySelector(".profileID").textContent;
    playerContainer.innerHTML = "";

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
