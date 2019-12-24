import React from 'react';

const NewGame = (props) => (
  <section className="newGame">
    <h1 className="newGame__gameName">New Order</h1>
      <span className="newGame__demoArrow"></span>
    <button className="newGame__button" onClick={props.startGame}>Start Game</button>
  </section>
)

export default NewGame;