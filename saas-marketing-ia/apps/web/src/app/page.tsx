export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">SaaS Marketing IA</h1>
        <p className="text-xl text-gray-600">
          Plateforme d&apos;automatisation marketing basée sur l&apos;IA
        </p>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">🤖 Génération IA</h2>
          <p className="text-gray-600">
            Créez du contenu marketing optimisé grâce à l'intelligence artificielle
          </p>
        </div>
        
        <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">📅 Planning Éditorial</h2>
          <p className="text-gray-600">
            Planifiez et organisez vos campagnes sur tous vos canaux
          </p>
        </div>
        
        <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">👥 Collaboration</h2>
          <p className="text-gray-600">
            Travaillez en équipe avec des workflows d'approbation
          </p>
        </div>
      </div>
    </main>
  );
}
