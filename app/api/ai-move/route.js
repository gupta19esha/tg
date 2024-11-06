// app/api/get-ai-move/route.js
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {
  try {
    const { board, lastMove, difficulty, boardSize } = await request.json();

    const prompt = `You are playing Tic-Tac-Toe on a ${boardSize}x${boardSize} board. You are 'O' and the opponent is 'X'.
    Difficulty level: ${difficulty}
    Current board state:
    ${board.map(row => row.join(' | ')).join('\n')}
    
    The opponent's last move was at row ${lastMove.row}, column ${lastMove.col}.
    
    Based on the current board state and difficulty level, what is your next move?
    Respond only with the row and column numbers for your move in JSON format.
    Consider strategy based on the difficulty level:
    - 'easy': Make mostly random moves
    - 'medium': Block obvious wins and take obvious winning moves
    - 'hard': Use optimal strategy`;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a Tic-Tac-Toe AI player. Respond only with valid moves in JSON format {row: number, col: number}"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: difficulty === 'easy' ? 0.8 : difficulty === 'medium' ? 0.4 : 0.1,
    });

    // Parse the AI's response to get row and column
    const move = JSON.parse(response.choices[0].message.content);

    return NextResponse.json({ move });
  } catch (error) {
    console.error('Error in AI move generation:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI move' },
      { status: 500 }
    );
  }
}