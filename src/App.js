import React, { useState } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [nextPlayer, setNextPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = nextPlayer;
    setBoard(newBoard);
    setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
    if (board.every(cell => cell !== null)) {
      setWinner('draw');
    }
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setNextPlayer('X');
    setWinner(null);
  };

  return (
    <div className="game">
      <div className="board">
        {board.map((_, index) => (
          <div key={index} className="square-container">
            {renderSquare(index)}
          </div>
        ))}
      </div>
      <div className="status">
        {winner ? (winner === 'draw' ? 'It\'s a draw!' : `Winner: ${winner}`) : `Next player: ${nextPlayer}`}
      </div>
      {winner && <button className="reset" onClick={resetGame}>Play Again</button>}
    </div>
  );
};

export default TicTacToe;
