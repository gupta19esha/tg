"use client";

import { useState } from 'react';

export default function GameBoard({ boardSize, difficulty }) {
  const [board, setBoard] = useState(Array(boardSize * boardSize).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState(null);

  // Function to check if there is a winner
  const checkWinner = (boardState) => {
    const lines = generateWinningLines(boardSize);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.every((index) => boardState[index] === 'X')) {
        setWinningCells(line);
        return 'X';
      }
      if (line.every((index) => boardState[index] === 'O')) {
        setWinningCells(line);
        return 'O';
      }
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
      console.log('Getting AI move for board:', getBoardState());
      
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

      const data = await response.json();
      console.log('AI move response:', data);

      if (!response.ok || !data.move) {
        throw new Error(data.error || 'Failed to get AI move');
      }

      return data.move;
    } catch (error) {
      console.error('Error getting AI move:', error);
      // Get all empty squares
      const emptySquares = [];
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          emptySquares.push(i);
        }
      }
      
      console.log('Empty squares available:', emptySquares);
      
      // If no empty squares, return null
      if (emptySquares.length === 0) {
        console.log('No empty squares available');
        return null;
      }
      
      // Pick a random empty square
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const fallbackMove = {
        row: Math.floor(emptySquares[randomIndex] / boardSize),
        col: emptySquares[randomIndex] % boardSize
      };
      
      console.log('Using fallback move:', fallbackMove);
      return fallbackMove;
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (index) => {
    if (board[index] || winner || loading) {
      return;
    }
    
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;
    
    // Player's move
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXTurn(false);

    // Check for winner after player's move
    const playerWinner = checkWinner(newBoard);
    if (playerWinner) {
      setWinner(playerWinner);
      return;
    }

    // Check for tie after player's move
    if (newBoard.every((cell) => cell !== null)) {
      setWinner('tie');
      return;
    }

    // AI's move
    try {
      const aiMoveResult = await getAIMove({ row, col });
      
      if (!aiMoveResult) {
        setWinner('tie');
        return;
      }

      const aiMoveIndex = aiMoveResult.row * boardSize + aiMoveResult.col;
      
      const finalBoard = [...newBoard];
      if (finalBoard[aiMoveIndex] === null) {
        finalBoard[aiMoveIndex] = 'O';
        setBoard(finalBoard);
        setIsXTurn(true);
        
        const aiWinner = checkWinner(finalBoard);
        if (aiWinner) {
          setWinner(aiWinner);
          return;
        }
        
        if (finalBoard.every((cell) => cell !== null)) {
          setWinner('tie');
        }
      } else {
        console.error('AI tried to move to occupied cell:', {
          aiMoveIndex,
          cellValue: finalBoard[aiMoveIndex],
          board: finalBoard
        });
        if (finalBoard.every((cell) => cell !== null)) {
          setWinner('tie');
        }
      }
    } catch (error) {
      console.error('Error during AI move:', error);
      if (newBoard.every((cell) => cell !== null)) {
        setWinner('tie');
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-8">
        {loading ? "AI is thinking..." : (isXTurn ? "Your turn" : "AI's turn")}
      </h2>
      
      <div
        className="grid gap-2 relative bg-accent-dark p-4 rounded-lg shadow-lg"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
          width: 'min(90vw, 400px)',
          height: 'min(90vw, 400px)',
          aspectRatio: '1 / 1'
        }}
      >
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={loading || winner !== null || value !== null}
            className={`
              game-cell
              flex items-center justify-center
              text-4xl font-bold
              min-h-[40px]
              rounded-md
              transition-colors
              ${value ? 'text-primary' : 'text-transparent'}
              ${winningCells?.includes(index) 
                ? 'bg-accent-lighter' 
                : 'bg-accent hover:bg-accent-darker'}
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
      
      {winner && (
        <div className="mt-8 text-center animate-slide-up">
          <p className="text-2xl font-bold">
            {winner === 'X' ? 'You won!' : 
             winner === 'O' ? 'AI won!' : 
             "It's a Tie!"}
          </p>
        </div>
      )}
    </div>
  );
}