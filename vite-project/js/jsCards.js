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

  const leaderboardButton = document.querySelector(".leaderboard");
  leaderboardButton.addEventListener("click", leaderboardCard);
}

function leaderboardCard(card) {
  const cardHTML = `
    <div class="leaderboardCard">
    <h1>${card.displayName}</h1>
    <p>Score: ${card.score}</p>
    <button class= profile><img src="./public/profile.webp"</button>
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

export { raceCard, leaderboardCard, playerCard };
