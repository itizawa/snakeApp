import React from 'react';
import './App.css';

import ClassNames from 'classnames';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      score: 0,
      gridSize: 10,
      time: 0,
      fruitIndex: 0,

      snakeStatus: {
        xPosition: 1,
        yPosition: 3,
        direction: '→',
        speed: 500,
        body: [0],
      }

    }
    this.countTime = this.countTime.bind(this)
    this.moveSnake = this.moveSnake.bind(this)
    this.onChangeDirection = this.onChangeDirection.bind(this)
    this.randomizeFruitIndex = this.randomizeFruitIndex.bind(this)
  }

  // ゲーム開始
  componentDidMount() {

    // キーボード入力のイベントをon_keydownメソッドに投げる
    document.onkeydown = (event) => {
      this.onChangeDirection(event.keyCode)
    }

    this.randomizeFruitIndex()
    this.countTime()
    this.moveSnake()
  }

  isFrameOut() {
    const { gridSize } = this.state
    const { xPosition, yPosition } = this.state.snakeStatus
    return xPosition < 0 || gridSize <= xPosition || yPosition < 0 || gridSize <= yPosition
  }

  isGameover() {
    return this.isFrameOut()
  }

  returnHeadIndex() {
    if (this.isFrameOut()) return null
    return this.state.snakeStatus.yPosition * this.state.gridSize + this.state.snakeStatus.xPosition
  }

  countTime() {
    if (this.isGameover()) return
    this.setState({ time: this.state.time + 1 })
    setTimeout(this.countTime, 1000)
  }

  moveSnake() {
    if (this.isGameover()) return
    const newSnakeStatus = this.state.snakeStatus
    let { speed, direction, body } = newSnakeStatus

    // 体の最後尾を頭に持ってくる
    body.shift()
    body.push(this.returnHeadIndex())

    switch (direction) {
      case '→': newSnakeStatus.xPosition++; break;
      case '↓': newSnakeStatus.yPosition++; break;
      case '←': newSnakeStatus.xPosition--; break;
      case '↑': newSnakeStatus.yPosition--; break;
      default: this.setState({ snakeStatus: newSnakeStatus });
    }
    this.setState({ score: this.state.score + speed / 100 })
    setTimeout(this.moveSnake, speed)
  }

  onChangeDirection(keyCode) {
    const newSnakeStatus = this.state.snakeStatus
    const { direction } = newSnakeStatus
    switch (keyCode) {
      case 37: if (direction !== '→') { newSnakeStatus.direction = '←' }; break;
      case 38: if (direction !== '↓') { newSnakeStatus.direction = '↑' }; break;
      case 39: if (direction !== '←') { newSnakeStatus.direction = '→' }; break;
      case 40: if (direction !== '↑') { newSnakeStatus.direction = '↓' }; break;
      default: this.setState({ snakeStatus: newSnakeStatus });
    }
  }

  randomizeFruitIndex() {
    const { gridSize } = this.state
    const fruitIndex = Math.floor(Math.random() * gridSize * gridSize)  // 0 〜 99 の乱数
    this.setState({ fruitIndex })
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

      const tileStyle = ClassNames({
        "defaultTile": true,
        "snakeHead": this.returnHeadIndex() === index,
        "snakeBody": this.state.snakeStatus.body.includes(index),
        "fruitColor": this.state.fruitIndex === index,
      });

      mapTiles.push(
        <div key={index} className={tileStyle}>{index}</div>
      )
    }

    return (
      <div className="App">
        <h1>Snake Game</h1>
        <p>SCORE:{this.state.score} TIME:{this.state.time}</p>
        <div id='map' style={mapStyle}>
          {mapTiles}
        </div>
        {(this.isGameover()) && <h2>GameOver</h2>}
      </div >
    );
  }
}

export default App;
