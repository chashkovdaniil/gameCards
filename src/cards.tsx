import React from "react";
import letters from "./Letters";
import Card from "./molecules/Card";

export function generateCard(handlerClickCard: any) {
  let cards: Array<any> = [];
  letters.forEach((el, index) => {
    for (let i = 0; i < 2; i++) {
      const key = i + index * Math.random();
      const card = <Card
        id={key}
        key={key}
        onClick={handlerClickCard}
      > {el} </Card>;
      cards.push(card);
    }
  });
  cards.sort(() => Math.random() - 0.5);
  return cards;
}
export function shuffleCards(cards: any) {
  let newCards = cards.slice();
  newCards.sort(() => Math.random() - 0.5);
  return newCards;
}