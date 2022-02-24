import React from 'react'
import './App.css';
import boxes from './boxes'
import Status from './components/Status';
import Square from './components/Square';

function App() {
  const winCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const [squares, setSquares] = React.useState(boxes)
  const [currentTurn, setCurrentTurn] = React.useState('X')
  const [statusText, setStatusText] = React.useState('Next player: X')
  const [gameOver, setGameOver] = React.useState(false)

  function onMove(id) {
    const nextTurn = (currentTurn === 'X' ? 'O' : 'X')
    const newSquares = [...squares]
    newSquares[id - 1].player = currentTurn

    setSquares(newSquares)
    setCurrentTurn(nextTurn)
    setStatusText('Next player: ' + nextTurn)
    checkBoard()
  }

  function checkBoard() {
    let isGameOver = false
    for (let i of winCombs) {
      if (squares[i[0]].player === squares[i[1]].player && squares[i[1]].player === squares[i[2]].player) {
        if (squares[i[0]].player !== '') {
          isGameOver = true
          setStatusText('Winner: ' + currentTurn)
          setGameOverColours(currentTurn)
        }
      }
    }
    if (isGameOver === false && !squares.find(square => square.player === '')) {
      setGameOverColours('tie')
      setStatusText('Tie')
    }
    setGameOver(isGameOver)
  }

  function resetBoard() {
    const resetBtn = document.getElementById("reset-btn")
    const boardDiv = document.getElementById("board")
    const statusDiv = document.getElementById("status")

    resetBtn.className = ""
    boardDiv.className = "board"
    statusDiv.className = "status"

    setGameOver(false)
    setCurrentTurn('X')
    setStatusText('Next player: X')
    const newSquares = [...squares]
    for (let square of newSquares) {
      square.player = ''
    }
    setSquares(newSquares)
  }

  function setGameOverColours(result) {
    const resetBtn = document.getElementById("reset-btn")
    const boardDiv = document.getElementById("board")
    const statusDiv = document.getElementById("status")

    if (result === 'tie') {
      resetBtn.className = "pulse"
      boardDiv.className = "board board--tie"
      statusDiv.className = "status status--tie"
    } else {
      resetBtn.className = "pulse"
      boardDiv.className = result === 'X' ? "board board--winnerX" : "board board--winnerO"
      statusDiv.className = result === 'X' ? "status status--winnerX" : "status status--winnerO"
    }
  }

  const squareElements = squares.map(square => (
    <Square
      key={square.id}
      player={square.player}
      handleMove={() => square.player === '' && gameOver === false ? onMove(square.id) : () => { }}
    />
  )
  )

  return (
    <div className='flex'>
      <div className="board" id="board">
        {squareElements}
      </div>
      <Status statusText={statusText} />
      <button type="button" id="reset-btn" onClick={resetBoard}>Reset</button>
    </div>
  )
}

export default App;
