// components/DifficultySelection.js
"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DifficultySelection() {
  const router = useRouter();
  const [boardSize, setBoardSize] = useState(3);
  const [difficulty, setDifficulty] = useState("Easy");

  const startGame = () => {
    // Pass the board size and difficulty as query params when navigating
    router.push(`/game?boardSize=${boardSize}&difficulty=${difficulty}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-6 px-6 py-3 bg-gradient-to-r from-purple-200 via-pink-200 to-gray-200 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
        Excited for a Tic-Tac-Toe Match?
      </h1>
      <h2 className="text-3xl font-semibold text-purple-800 mb-8 px-5 py-3 bg-gradient-to-r from-purple-200 via-pink-100 to-gray-100 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
        Go Ahead & Choose Difficulty and Board Size!
      </h2>
      
      <div className="mb-6">
        <label className="block text-purple-700 text-lg font-medium mb-2">Board Size:</label>
        <select 
          value={boardSize} 
          onChange={(e) => setBoardSize(parseInt(e.target.value))} 
          className="p-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-purple-700 text-lg font-medium mb-2">Difficulty:</label>
        <select 
          value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)} 
          className="p-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <button 
        onClick={startGame} 
        className="px-6 py-3 bg-purple-600 text-white text-xl rounded-full hover:bg-purple-700 transition duration-300"
      >
        Start Game
      </button>
    </div>
  );
}
