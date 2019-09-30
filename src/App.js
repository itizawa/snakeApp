import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      score: 0,
      gridSize: 10,
    }
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

    const tileStyle = {
      border: '1px solid white',
      background: 'whitesmoke'
    }

    const mapTiles = []

    for (let index = 0; index < gridSize * gridSize; index++) {
      mapTiles.push(
        <div key={index} style={tileStyle}></div>
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
