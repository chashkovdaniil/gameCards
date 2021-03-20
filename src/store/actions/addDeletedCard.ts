import InterfaceCard from "../../interfaces/Card";

export const ADD_DELETED_CARD = 'ADD_DELETED_CARD';
export function addDeletedCard({ id, content }: InterfaceCard) {
  return {
    type: ADD_DELETED_CARD,
    card: {
      id,
      content
    }
  };
}