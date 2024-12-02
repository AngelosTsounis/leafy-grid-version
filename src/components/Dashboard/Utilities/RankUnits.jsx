import RankCalculationService from "./RankCalculationService";

export const calculateRanks = (pointsAwarded) => {
  // Ensure the ranks are sorted by minPoints
  const sortedRanks = RankCalculationService.sort(
    (a, b) => a.minPoints - b.minPoints
  );

  // Find the current rank index
  const currentRankIndex =
    sortedRanks.findIndex((rank) => pointsAwarded < rank.minPoints) - 1;

  // Get the current rank (default to the first rank if no match)
  const currentRank = sortedRanks[currentRankIndex >= 0 ? currentRankIndex : 0];

  // Get the next rank (if available)
  const nextRank = sortedRanks[currentRankIndex + 1] || null;

  return { currentRank, nextRank };
};
