import InterfaceCard from "../../interfaces/interfaceCard";

export const ADD_CARD = 'ADD_CARD';
export function addCard({id, content}: InterfaceCard) {
  return {
    type: ADD_CARD,
    card: {
      id,
      content
    }
  };
}