"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DifficultySelection() {
  const router = useRouter();
  const [boardSize, setBoardSize] = useState(3);
  const [difficulty, setDifficulty] = useState("Easy");

  const startGame = () => {
    router.push(`/game?boardSize=${boardSize}&difficulty=${difficulty}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold animate-slide-up">
            Tic-Tac-Toe
          </h1>
          <h2 className="text-xl text-secondary-dark">
            Choose Your Challenge
          </h2>
        </div>

        <div className="space-y-6 mt-8">
          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Board Size
            </label>
            <select 
              value={boardSize} 
              onChange={(e) => setBoardSize(parseInt(e.target.value))}
              className="select-input"
            >
              <option value={3}>3x3</option>
              <option value={4}>4x4</option>
              <option value={5}>5x5</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Difficulty
            </label>
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
              className="select-input"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <button 
            onClick={startGame} 
            className="btn-primary w-full mt-8"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}