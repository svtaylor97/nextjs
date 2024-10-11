// This is your API route to update the ELO score
import { calculateElo } from '../../utils/elo';

export default async function handler(req, res) {
    const { winnerId, loserId } = req.body;
    const { winnerElo, loserElo } = await fetchEloScores(winnerId, loserId);

    const newScores = calculateElo(winnerElo, loserElo);
    await updateScoresInDB(winnerId, loserId, newScores);

    res.status(200).json({ success: true });
}
