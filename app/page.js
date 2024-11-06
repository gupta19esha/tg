// app/page.js
import DifficultySelection from '../components/DifficultySelection';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <DifficultySelection />
    </main>
  );
}
