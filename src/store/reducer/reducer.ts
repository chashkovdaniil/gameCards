import InterfaceCard from '../../interfaces/Card';
import { ADD_CARD } from '../actions/addCard';
import { ADD_DELETED_CARD } from '../actions/addDeletedCard';
import { CLOSE_ALL } from '../actions/closeAll';
import { REMOVE_CARD } from '../actions/removeCard';

export default function reducer(
  state: any,
  action: {
    type: string;
    card: InterfaceCard;
    id: string;
  }
) {
  switch (action.type) {
    case ADD_CARD: {
      console.log(`Added: ${action.card.id}-${action.card.content}`);
      state.openCards.push(action.card);
      return state;
    }
    case REMOVE_CARD: {
      console.log(`Remove: ${action.id}`);
      state.openCards = state.openCards.filter(
        (el: InterfaceCard) => (action.id !== el.id)
      );
      return state;
    }
    case ADD_DELETED_CARD: {
      state.deletedCards.push(action.card);
      return state;
    }
    case CLOSE_ALL: {
      state.openCards = [];
      return state;
    }
  }
  return state;
}