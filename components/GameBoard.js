"use client";

import { useState, useEffect } from 'react';

export default function GameBoard({ boardSize, difficulty }) {
  const [board, setBoard] = useState(Array(boardSize * boardSize).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState(null); // Add state for winner

  // Function to check if there is a winner
  const checkWinner = (boardState) => {
    const lines = generateWinningLines(boardSize);
    for (let line of lines) {
      if (line.every((index) => boardState[index] === 'X')) return 'X';
      if (line.every((index) => boardState[index] === 'O')) return 'O';
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
      return data.move;
    } catch (error) {
      console.error('Error getting AI move:', error);
      const emptySquares = board.map((value, idx) => (value === null ? idx : null)).filter(idx => idx !== null);
      return {
        row: Math.floor(emptySquares[0] / boardSize),
        col: emptySquares[0] % boardSize
      };
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (index) => {
    if (board[index] || winner || loading) return;
    
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;
    
    // Player's move
    const newBoard = board.slice();
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXTurn(false);

    // Check for winner after player's move
    const playerWinner = checkWinner(newBoard);
    if (playerWinner) {
      setWinner(playerWinner);
      return;
    }

    // AI's move
    const aiMoveResult = await getAIMove({ row, col });
    const aiMoveIndex = aiMoveResult.row * boardSize + aiMoveResult.col;
    
    if (newBoard[aiMoveIndex] === null) {
      newBoard[aiMoveIndex] = 'O';
      setBoard(newBoard);
      setIsXTurn(true);
      
      // Check for winner after AI's move
      const aiWinner = checkWinner(newBoard);
      if (aiWinner) {
        setWinner(aiWinner);
      }
    }
  };

  const isTie = !winner && board.every((cell) => cell !== null);

  return (
    <div className="flex flex-col items-center p-6 animate-fade-in">
      <div
        className="grid gap-2 relative bg-accent-dark p-4 rounded-lg shadow-lg"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
          width: `${boardSize * 4}rem`,
          height: `${boardSize * 4}rem`
        }}
      >
        {loading && (
          <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
          </div>
        )}
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={loading || winner !== null || value !== null}
            className={`
              game-cell
              ${value ? 'text-primary' : 'text-transparent'}
              ${loading || winner || value 
                ? 'cursor-not-allowed opacity-75' 
                : 'hover:bg-accent-darker'
              }
            `}
          >
            {value}
          </button>
        ))}
      </div>
      
      {(winner || isTie) && (
        <div className="mt-8 text-center animate-slide-up">
          {winner && (
            <p className="text-2xl font-bold">
              Winner: {winner}
            </p>
          )}
          {isTie && (
            <p className="text-2xl font-bold">
              It's a Tie!
            </p>
          )}
        </div>
      )}
    </div>
  );
}