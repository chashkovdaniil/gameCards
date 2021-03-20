export const REMOVE_CARD = 'REMOVE_CARD';
export function removeCard(id: string) {
  return {
    type: REMOVE_CARD,
    id
  };
}