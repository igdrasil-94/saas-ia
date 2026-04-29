'use client';

import { useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/content/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: 'Marketing digital pour PME',
          format: 'linkedin',
          tone: 'professionnel',
        }),
      });
      const data = await response.json();
      setContent(data.content || 'Erreur de génération');
    } catch (error) {
      setContent('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SaaS Marketing IA
          </h1>
          <p className="text-xl text-gray-600">
            Générez du contenu marketing percutant avec l'IA
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Générateur de Contenu
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sujet
              </label>
              <input
                type="text"
                placeholder="Ex: Les avantages du marketing digital..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>LinkedIn</option>
                  <option>Twitter</option>
                  <option>Article de blog</option>
                  <option>Email</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ton
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Professionnel</option>
                  <option>Amical</option>
                  <option>Persuasif</option>
                  <option>Informatif</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateContent}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:scale-[1.02]"
            >
              {loading ? 'Génération en cours...' : 'Générer le contenu'}
            </button>
          </div>
        </div>

        {content && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Résultat
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
            </div>
          </div>
        )}

        <div className="mt-12 grid grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Templates IA</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600">Disponibilité</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">10x</div>
            <div className="text-gray-600">Plus rapide</div>
          </div>
        </div>
      </div>
    </main>
  );
}
