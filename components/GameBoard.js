"use client";

import { useState, useEffect } from 'react';

export default function GameBoard({ boardSize, difficulty }) {
  const [board, setBoard] = useState(Array(boardSize * boardSize).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [loading, setLoading] = useState(false);

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

  const getBoardState = () => {
    // Convert board array to 2D grid representation
    const grid = [];
    for (let i = 0; i < boardSize; i++) {
      const row = [];
      for (let j = 0; j < boardSize; j++) {
        const value = board[i * boardSize + j];
        row.push(value || ' ');
      }
      grid.push(row);
    }
    return grid;
  };

  const getAIMove = async (lastPlayerMove) => {
    try {
      setLoading(true);
      const response = await fetch('/api/ai-move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          board: getBoardState(),
          lastMove: lastPlayerMove,
          difficulty,
          boardSize
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI move');
      }

      const data = await response.json();
      return data.move; // Expected format: { row: number, col: number }
    } catch (error) {
      console.error('Error getting AI move:', error);
      // Fallback to random move if API fails
      const emptySquares = board.map((value, idx) => (value === null ? idx : null)).filter(idx => idx !== null);
      return {
        index: emptySquares[Math.floor(Math.random() * emptySquares.length)]
      };
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (index) => {
    if (board[index] || checkWinner() || loading) return;
    
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;
    
    // Player's move
    const newBoard = board.slice();
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXTurn(false);

    // AI's move
    const aiMoveResult = await getAIMove({ row, col });
    const aiMoveIndex = aiMoveResult.row * boardSize + aiMoveResult.col;
    
    if (newBoard[aiMoveIndex] === null) {
      newBoard[aiMoveIndex] = 'O';
      setBoard(newBoard);
      setIsXTurn(true);
    }
  };

  const winner = checkWinner();
  const isTie = !winner && board.every((cell) => cell !== null);

  return (
    <div className="flex flex-col items-center">
      <div
        className="grid gap-2 relative"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
          width: `${boardSize * 4}rem`,
          height: `${boardSize * 4}rem`
        }}
      >
        {loading && (
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={loading || !!winner || !!value}
            className={`
              flex items-center justify-center border-2 border-purple-500 text-2xl font-bold
              ${value ? 'text-purple-700' : 'text-transparent'}
              ${loading || winner || value ? 'cursor-not-allowed' : 'hover:bg-purple-50'}
              bg-white transition-colors duration-200
            `}
            style={{ width: '100%', height: '100%' }}
          >
            {value}
          </button>
        ))}
      </div>
      {winner && <p className="text-xl font-bold mt-4">Winner: {winner}</p>}
      {isTie && <p className="text-xl font-bold mt-4">It's a Tie!</p>}
    </div>
  );
}