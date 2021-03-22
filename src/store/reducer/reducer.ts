import InterfaceCard from '../../interfaces/interfaceCard';
import { ADD_CARD } from '../actions/addCard';
import { REMOVE_CARD } from '../actions/removeCard';
import { SET_SCORE } from '../actions/setScore';
import { SET_TIMER_CARD } from '../actions/setTimerCard';
import { START_GAME } from '../actions/startGame';
import { STOP_GAME } from '../actions/stopGame';

export default function reducer(
  state: any,
  action: {
    type: string;
    card: InterfaceCard;
    id: string;
    timerFirstOpenCard: string;
    score: number;
  }
) {
  switch (action.type) {
    case START_GAME: {
      console.log('Started');
      state.isStarted = true;
      return state;
    }
    case STOP_GAME: {
      console.log('Stoped');
      state.isStarted = false;
      return state;
    }
    case ADD_CARD: {
      state.openedCards.push(action.card);
      return state;
    }
    case REMOVE_CARD: {
      state.openedCards = state.openedCards.filter(
        (el: InterfaceCard) => (action.id !== el.id)
      );
      return state;
    }
    case SET_SCORE: {
      state.score = action.score;
      return state;
    }
    case SET_TIMER_CARD: {
      state.timerFirstOpenCard = action.timerFirstOpenCard;
    }
  }
  return state;
}