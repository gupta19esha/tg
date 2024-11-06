// components/GameBoard.js
"use client";

import { useState, useEffect } from 'react';

export default function GameBoard({ boardSize, difficulty }) {
  const [board, setBoard] = useState(Array(boardSize * boardSize).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  // Function to check if there is a winner
  const checkWinner = () => {
    const lines = generateWinningLines(boardSize);
    for (let line of lines) {
      if (line.every((index) => board[index] === 'X')) return 'X';
      if (line.every((index) => board[index] === 'O')) return 'O';
    }
    return null;
  };

  // Generate winning lines dynamically based on board size
  const generateWinningLines = (size) => {
    let lines = [];

    // Rows
    for (let i = 0; i < size; i++) {
      lines.push([...Array(size)].map((_, j) => i * size + j));
    }

    // Columns
    for (let i = 0; i < size; i++) {
      lines.push([...Array(size)].map((_, j) => j * size + i));
    }

    // Diagonals
    lines.push([...Array(size)].map((_, i) => i * (size + 1))); // Main diagonal
    lines.push([...Array(size)].map((_, i) => (i + 1) * (size - 1))); // Anti-diagonal

    return lines;
  };

  const handleClick = (index) => {
    if (board[index] || checkWinner()) return;
    const newBoard = board.slice();
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXTurn(false);
  };

  const aiMove = () => {
    if (isXTurn || checkWinner()) return;
    const emptySquares = board.map((value, idx) => (value === null ? idx : null)).filter(idx => idx !== null);
    const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    const newBoard = board.slice();
    newBoard[randomIndex] = 'O';
    setBoard(newBoard);
    setIsXTurn(true);
  };

  useEffect(() => {
    if (!isXTurn) aiMove();
  }, [isXTurn]);

  const winner = checkWinner();

  return (
    <div className="flex flex-col items-center">
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
          width: `${boardSize * 4}rem`,
          height: `${boardSize * 4}rem`
        }}
      >
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="flex items-center justify-center border-2 border-purple-500 text-2xl font-bold text-purple-700 bg-white"
            style={{ width: '100%', height: '100%' }}
          >
            {value}
          </button>
        ))}
      </div>
      {winner && <p className="text-xl font-bold mt-4">Winner: {winner}</p>}
      {!winner && board.every((cell) => cell !== null) && <p className="text-xl font-bold mt-4">It's a Tie!</p>}
    </div>
  );
}
