export const SET_TIMER_CARD = 'SET_TIMER_CARD';
export function setTimerCard(timerId: any){
  return {
    type: SET_TIMER_CARD,
    timerFirstOpenCard: timerId
  }
}