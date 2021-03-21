export const SET_TIMER = 'SET_TIMER';
export function setTimer(timerId: any){
  return {
    type: SET_TIMER,
    timer: timerId
  }
}