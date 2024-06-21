import fuzzball from 'fuzzball';

export default function getSimilarityPercentage(str1: string, str2: string): number {
  const similarity = fuzzball.ratio(str1, str2);
  if (!similarity || Number.isNaN(similarity)) {
    return 0;
  }
  return parseFloat((similarity).toFixed(1));
}
