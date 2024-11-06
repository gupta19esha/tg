// app/game/page.js
"use client";

import { useSearchParams } from 'next/navigation';
import GameBoard from '../../components/GameBoard';

export default function GamePage() {
  const searchParams = useSearchParams();
  const boardSize = parseInt(searchParams.get('boardSize') || '3');
  const difficulty = searchParams.get('difficulty') || 'Easy';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/* Welcome Header */}
      <h1 className="text-4xl font-bold text-purple-700 mb-6">
        🎉 Welcome to the Ultimate TIC TAC TOE GAME! 🎉
      </h1>
      
      {/* Difficulty Level Display */}
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">
        Difficulty: {difficulty}
      </h2>
      
      {/* Game Board Component */}
      <GameBoard boardSize={boardSize} difficulty={difficulty} />
    </main>
  );
}
