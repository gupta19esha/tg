// app/api/get-ai-move/route.js
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

function isValidMove(board, move) {
  // Check if the cell is within bounds
  if (move.row < 0 || move.row >= board.length || 
      move.col < 0 || move.col >= board[0].length) {
    return false;
  }
  
  // Check if the cell is empty (contains a space)
  return board[move.row][move.col] === ' ';
}

function getAvailableMoves(board) {
  const moves = [];
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === ' ') {
        moves.push({ row, col });
      }
    }
  }
  return moves;
}

export async function POST(request) {
  try {
    const { board, lastMove, difficulty, boardSize } = await request.json();
    console.log('API received request:', { board, lastMove, difficulty, boardSize });

    // Get available moves
    const availableMoves = getAvailableMoves(board);
    console.log('Available moves:', availableMoves);

    if (availableMoves.length === 0) {
      console.log('No available moves');
      return NextResponse.json({ error: 'No available moves' }, { status: 400 });
    }

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: "You are a Tic-Tac-Toe AI player. Respond only with valid moves in JSON format {row: number, col: number}"
          },
          {
            role: "user",
            content: `You are playing Tic-Tac-Toe on a ${boardSize}x${boardSize} board. You are 'O' and the opponent is 'X'.
              Difficulty level: ${difficulty}
              Current board state:
              ${board.map(row => row.join(' | ')).join('\n')}
              
              The opponent's last move was at row ${lastMove.row}, column ${lastMove.col}.
              Available moves are: ${JSON.stringify(availableMoves)}
              
              Choose ONLY from the available moves listed above.
              Respond only with the row and column numbers for your move in JSON format.`
          }
        ],
        temperature: difficulty === 'easy' ? 0.8 : difficulty === 'medium' ? 0.4 : 0.1,
      });

      const move = JSON.parse(response.choices[0].message.content);
      console.log('AI generated move:', move);

      // Validate the AI's move
      if (!isValidMove(board, move)) {
        console.log('AI generated invalid move, using random move instead');
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        return NextResponse.json({ move: randomMove });
      }

      return NextResponse.json({ move });
    } catch (error) {
      console.error('Error generating AI move:', error);
      // Always fall back to a random valid move
      const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      console.log('Using random fallback move:', randomMove);
      return NextResponse.json({ move: randomMove });
    }
  } catch (error) {
    console.error('Error in AI move generation:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI move' },
      { status: 500 }
    );
  }
}