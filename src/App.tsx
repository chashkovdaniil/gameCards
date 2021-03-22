import React, { SyntheticEvent, useEffect, useState } from 'react';
import './App.sass';
import Button from './atoms/Button';
import InterfaceCard from './interfaces/interfaceCard';
import { shuffleCards, generateCard } from './cards';
import { addCard } from './store/actions/addCard';
import { removeCard } from './store/actions/removeCard';
import { setTimerCard } from './store/actions/setTimerCard';
import { setScore } from './store/actions/setScore';
import { startGame } from './store/actions/startGame';
import { stopGame } from './store/actions/stopGame';

export default function App({ store }: any) {
  const [isStarted, setStarted] = useState(false);
  const [timer, setTimer] = useState(120);
  const [score, setscore] = useState(store.getState().score);

  useEffect(() => {
    if (timer === 0) {
      alert(`Игра закончилась со счётом: ${score}`);
      restart();
      return;
    }
    if (score === 18) {
      alert(`Поздравялем с победой!`);
      restart();
      return;
    }
    if (isStarted) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer, isStarted, score]);
  const start = () => {
    store.dispatch(startGame());
    setStarted(true);
  }
  const pause = () => {
    store.dispatch(stopGame());
    setStarted(false);
  }
  const newScore = (num: number) => {
    store.dispatch(setScore(num));
    setscore(num);
  }
  const openCard = (id: string, content: string) => {
    const card: InterfaceCard = { id, content, };
    const openedCards: Array<InterfaceCard> = store.getState().openedCards;

    store.dispatch(addCard(card));
    document.querySelector(`.card[id="${id}"]`)?.classList.add('card_opened');

    if (openedCards.length === 2) {
      clearTimeout(store.getState().timerFirstOpenCard);
      if (openedCards[0].content === openedCards[1].content) {
        newScore(store.getState().score + 1);
        for (let i = 0; i < openedCards.length; i++) {
          document.querySelector(`.card[id="${openedCards[i].id}"]`)?.classList.add('card_deleted');
        }
        closeAllCards(openedCards);
        return;
      };
      closeAllCards(openedCards, 500);
      return;
    } else if (openedCards.length === 1) {
      const timerId = closeAllCards(openedCards, 5000);
      store.dispatch(setTimerCard(timerId));
    }
    return;
  }
  const closeCard = (id: string) => {
    document.querySelector(`.card[id="${id}"]`)?.classList.remove('card_opened');
    store.dispatch(removeCard(id));
  }
  const handlerClickCard = (event: SyntheticEvent) => {
    let card = event.currentTarget;
    if (isStarted) {
      start();
    }
    if (card.classList.contains('card_deleted')) return;
    if (card.classList.contains('card_opened')) {
      closeCard(card.id);
      card.classList.remove('card_opened');
      return;
    }
    openCard(card.id, card.innerHTML);
    card.classList.add('card_opened');
  }

  const closeAllCards = (openedCards: InterfaceCard[], timeClose: number = 0) => {
    return setTimeout(() => {
      for (let i = 0; i < openedCards.length; i++) {
        closeCard(openedCards[i].id);
      }
    }, timeClose);
  }
  const restart = () => {
    pause();
    setTimeout(() => setTimer(120), 1000);
    newScore(0);
    clearTimeout(store.getState().timerFirstOpenCard);

    document.querySelectorAll('.card_deleted').forEach((elem) => {
      elem.classList.remove('card_deleted');
    });
    document.querySelectorAll('.card_opened').forEach((elem) => {
      elem.classList.remove('card_opened');
    });
    setCards(shuffleCards(cards.slice()));
  }
  const [cards, setCards] = useState(generateCard(handlerClickCard));
  return (
    <>
      <div className="panel">
        <Button onClick={start} disabled={isStarted}>Start</Button>
        <Button onClick={pause} disabled={!isStarted}>Pause</Button>
        <Button onClick={restart}>Restart</Button>
      </div>
      <div className="panel panel_non-padding">
        <h3>Time: {new Date(timer * 1000).getMinutes()}:{new Date(timer * 1000).getSeconds()}</h3>
        <h3>Score: {score}</h3>
      </div>
      <div className="area">
        {cards}
      </div>
    </>
  );
}
