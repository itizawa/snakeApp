import React from 'react';
import './App.css';

import ClassNames from 'classnames';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      score: 0,
      gridSize: 10,

      snakeStatus: {
        xPosition: 1,
        yPosition: 3,
        direction: '→',
        speed: 500
      }

    }
  }

  returnHeadIndex() {
    // TODO はみでた時にnullを返す
    return this.state.snakeStatus.yPosition * this.state.gridSize + this.state.snakeStatus.xPosition
  }

  render() {
    const { gridSize } = this.state

    const mapStyle = {
      gridSize: gridSize,
      display: 'grid',
      gridTemplateColumns: `repeat(${gridSize}, 30px)`,
      gridTemplateRows: `repeat(${gridSize}, 30px)`,
      margin: '0 auto',
      width: '300px'
    }

    const mapTiles = []

    for (let index = 0; index < gridSize * gridSize; index++) {
      
      const tyleStyle = ClassNames({
        "defaultTile": true,
        "snakeHead": this.returnHeadIndex() === index
      });

      mapTiles.push(
        <div key={index} className={tyleStyle}>{index}</div>
      )
    }

    return (
      <div className="App">
        <h1>Snake Game</h1>
        <p>SCORE:{this.state.score}</p>
        <div id='map' style={mapStyle}>
          {mapTiles}
        </div>
      </div >
    );
  }
}

export default App;
