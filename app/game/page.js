// app/game/page.js
"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import GameBoard from '../../components/GameBoard';

export default function GamePage() {
  const searchParams = useSearchParams();
  const boardSize = parseInt(searchParams.get('boardSize') || '3');
  const difficulty = searchParams.get('difficulty') || 'Easy';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative">
      <Link 
        href="/start-game" 
        className="btn-secondary fixed top-[15%] left-4 z-10"
      >
        ← Back
      </Link>
      {/* Game Board Component */}
      <GameBoard boardSize={boardSize} difficulty={difficulty} />
    </main>
  );
}
