import { NextResponse } from 'next/server';

export async function POST(request) {
  const { board } = await request.json();

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `Play the next move on this Tic Tac Toe board: ${JSON.stringify(board)}`,
      max_tokens: 1,
    }),
  });

  const data = await response.json();
  return NextResponse.json({ move: parseInt(data.choices[0].text.trim()) });
}
