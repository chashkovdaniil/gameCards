export const SET_SCORE = 'SET_SCORE';
export function setScore(score: number) {
  return {
    type: SET_SCORE,
    score
  }
}