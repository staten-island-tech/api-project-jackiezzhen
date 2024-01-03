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

  async function callLeaderboard(button) {
    const raceID = button.parentElement.querySelector(".ID").textContent;
    const leaderboardContainer = document.querySelector(
      ".leaderboardContainer"
    );
    leaderboardContainer.innerHTML = "";
    const leaderboardURL = `https://data.ninjakiwi.com/btd6/races/${raceID}/leaderboard`;

    try {
      const leaderboardResponse = await fetch(leaderboardURL);
      if (leaderboardResponse.status !== 200) {
        throw new Error(leaderboardResponse.statusText);
      }
      const leaderboardData = await leaderboardResponse.json();
      leaderboardData.body.forEach((data) => {
        leaderboardCard(data);
      });
      document.querySelector(".backButton").style.display = "block";
    } catch (leaderboardError) {
      DOMSelectors.error = "whoops";
    }
  }
}

function leaderboardCard(card) {
  const cardHTML = `
    <div class="leaderboardCard">
      <h1 class=leaderboardDisplayName>${card.displayName}</h1>
      <p class=leaderboardScore>Score: ${card.score}</p>
      <button class=profile><img src="/public/profile.webp" alt="Error"></button>
    </div>
  `;
  const leaderboardContainer = document.querySelector(".leaderboardContainer");
  leaderboardContainer.insertAdjacentHTML("beforeend", cardHTML);
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

export { raceCard, leaderboardCard, playerCard, DOMSelectors };
