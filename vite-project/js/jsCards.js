const DOMSelectors = {
  error: document.querySelector(".title").textContent,
  raceContainer: document.querySelector(".raceContainer"),
  leaderboardContainer: document.querySelector(".leaderboardContainer"),
  playerContainer: document.querySelector(".playerContainer"),
  leaderboardCardsAdded: false,
  playerCardAdded: false,
};
//Back Button
function leaderboardBackButton(container) {
  const backButtonHTML = `<button class="backButton"><img class=backButtonImg src="public/back-arrow.png" alt="Back"></button>`;
  container.insertAdjacentHTML("afterbegin", backButtonHTML);
  const backButton = container.querySelector("button.backButton");
  backButton.addEventListener("click", () => {
    container.innerHTML = "";
    DOMSelectors.raceContainer.style.display = "flex";
    DOMSelectors.leaderboardCardsAdded = false;
  });
}
function playerBackButton(container) {
  const backButtonHTML = `<button class="backButton"><img class=backButtonImg src="public/back-arrow.png" alt="Back"></button>`;
  container.insertAdjacentHTML("afterbegin", backButtonHTML);
  const backButton = container.querySelector("button.backButton");
  backButton.addEventListener("click", () => {
    container.innerHTML = "";
    DOMSelectors.playerContainer.style.display = "none";
    DOMSelectors.playerCardAdded = false;
  });
}
//Maps
async function raceCard(card) {
  const startTime = new Date(card.start);
  const endTime = new Date(card.end);
  const metadataURL = `https://data.ninjakiwi.com/btd6/races/${card.id}/metadata`;
  const metadataResponse = await fetch(metadataURL);
  const metadata = await metadataResponse.json();
  const mapURL = metadata.body.mapURL;
  const cardHTML = `
      <div class="raceCard">
        <h1>${card.name}</h1>
        <p>Start Time: ${startTime}</p>
        <p>End Time: ${endTime}</p>
        <img class="mapImg" src="${mapURL}" alt="Race Map">
        <p>Players Participated: ${card.totalScores}</p>
        <button class="leaderboard">Leaderboard</button>
        <p class="ID">${card.id}</p>
      </div>
    `;
  DOMSelectors.raceContainer.insertAdjacentHTML("beforeend", cardHTML);

  const leaderboardButtons = document.querySelectorAll("button.leaderboard");
  leaderboardButtons.forEach((button) => {
    button.addEventListener("click", () => {
      callLeaderboard(button);
      DOMSelectors.leaderboardContainer.style.display = "flex";
      DOMSelectors.raceContainer.style.display = "none";
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });

  //Leaderboard
  async function callLeaderboard(button) {
    const raceID = button.parentElement.querySelector(".ID").textContent;
    DOMSelectors.leaderboardContainer.innerHTML = "";
    leaderboardBackButton(DOMSelectors.leaderboardContainer);
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
      DOMSelectors.leaderboardCardsAdded = true;
    } catch (leaderboardError) {
      DOMSelectors.error = "whoops";
    }
  }

  async function leaderboardCard(card) {
    if (!DOMSelectors.leaderboardCardsAdded) {
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
        DOMSelectors.leaderboardContainer.insertAdjacentHTML("beforeend",cardHTML);
        const playerButtons = document.querySelectorAll("button.profile");
        playerButtons.forEach((button) => {
          button.addEventListener("click", () => callPlayer(button));
        });
      } catch (leaderboardError) {
        DOMSelectors.error = "whoops";
      }
    }
  }

  //Player
  async function callPlayer(button) {
    DOMSelectors.playerContainer.style.display = "flex";
    const profileURL =
      button.parentElement.querySelector(".profileID").textContent;
    DOMSelectors.playerContainer.innerHTML = "";
    playerBackButton(DOMSelectors.playerContainer);
    try {
      const playerResponse = await fetch(profileURL);
      if (playerResponse.status !== 200) {
        throw new Error(playerResponse.statusText);
      }
      const player = await playerResponse.json();
      const playerData = player.body;
      playerCard(playerData);
      DOMSelectors.playerCardAdded = true;
    } catch (playerError) {
      DOMSelectors.error = "whoops";
    }
  }

  async function playerCard(card) {
    if (!DOMSelectors.playerCardAdded) {
      const cardHTML = `
        <div class="playerCard">
        <img class= avatar src="${card.avatarURL}" alt="Avatar">
        <img class= banner src="${card.bannerURL}" alt="Banner">
        <div class=playerText>
        <p>${card.displayName}</p>
        <p>Veteran Rank: ${card.veteranRank}</p>
        <p>Achievements: ${card.achievements}</p>
        </div>
        <div class=playerInfo>
        <p>Easy Map Completions: ${card._medalsSinglePlayer.Easy}</p>
        <p>Madium Map Completions: ${card._medalsSinglePlayer.Medium}</p>
        <p>Hard Map Completions: ${card._medalsSinglePlayer.Hard}</p>
        <p>Primary Only: ${card._medalsSinglePlayer.PrimaryOnly}</p>
        <p>Deflation: ${card._medalsSinglePlayer.Deflation}</p>
        <p>Military Only: ${card._medalsSinglePlayer.MilitaryOnly}</p>
        <p>Double Moab Health: ${card._medalsSinglePlayer.DoubleMoabHealth}</p>
        <p>Alternate Bloons Rounds: ${card._medalsSinglePlayer.AlternateBloonsRounds}</p>
        <p>Impoppable: ${card._medalsSinglePlayer.Impoppable}</p>
        <p>Chimps: ${card._medalsSinglePlayer.Clicks}</p>
        </div>
        </div>
      `;
      DOMSelectors.playerContainer.insertAdjacentHTML("beforeend", cardHTML);
    }
  }
}

export { DOMSelectors, raceCard };
