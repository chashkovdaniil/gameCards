import InterfaceCard from '../../interfaces/interfaceCard';
import { ADD_CARD } from '../actions/addCard';
import { ADD_DELETED_CARD } from '../actions/addDeletedCard';
import { REMOVE_CARD } from '../actions/removeCard';
import { SET_SCORE } from '../actions/setScore';
import { SET_TIMER } from '../actions/setTimer';

export default function reducer(
  state: any,
  action: {
    type: string;
    card: InterfaceCard;
    id: string;
    timer: string;
    score: number;
  }
) {
  switch (action.type) {
    case ADD_CARD: {
      console.log(`Added: ${action.card.id}-${action.card.content}`);
      state.openedCards.push(action.card);
      return state;
    }
    case REMOVE_CARD: {
      console.log(`Remove: ${action.id}`);
      state.openedCards = state.openedCards.filter(
        (el: InterfaceCard) => (action.id !== el.id)
      );
      return state;
    }
    case ADD_DELETED_CARD: {
      state.deletedCards.push(action.card);
      return state;
    }
    case SET_SCORE: {
      state.score = action.score;
      return state;
    }
    case SET_TIMER: {
      state.timer = action.timer;
    }
  }
  return state;
}