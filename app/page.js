// app/page.js
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">
            Play Tic Tac Toe Against AI
          </h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Challenge our advanced AI in a game of Tic Tac Toe. 
            Choose your difficulty level and board size for an engaging experience.
          </p>
          
          <div className="flex justify-center gap-6">
            <Link href="/start-game" className="btn-primary text-lg px-8 py-3">
              Get Started
            </Link>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Multiple Difficulties" 
            description="Choose from easy, medium, or hard difficulty levels to match your skill."
          />
          <FeatureCard 
            title="Customizable Board" 
            description="Play on different board sizes from 3x3 up to 5x5."
          />
          <FeatureCard 
            title="Smart AI" 
            description="Face off against our advanced AI powered by machine learning."
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-accent-dark p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-primary/80">{description}</p>
    </div>
  );
}
