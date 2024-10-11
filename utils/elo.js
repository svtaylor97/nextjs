export function calculateElo(winnerElo, loserElo, kFactor = 32) {
    const expectedScoreWinner = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
    const expectedScoreLoser = 1 / (1 + Math.pow(10, (winnerElo - loserElo) / 400));

    const newWinnerElo = winnerElo + kFactor * (1 - expectedScoreWinner);
    const newLoserElo = loserElo + kFactor * (0 - expectedScoreLoser);

    return { newWinnerElo, newLoserElo };
}
