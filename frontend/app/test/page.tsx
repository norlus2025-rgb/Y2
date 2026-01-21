export default function TestPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl">
                <h1 className="text-4xl font-bold text-orange-600 mb-4">
                    Test Tailwind
                </h1>
                <p className="text-gray-700 mb-4">
                    Si tu vois cette page avec des couleurs orange/rouge et une carte blanche,
                    Tailwind fonctionne ! ✅
                </p>
                <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                    Bouton de Test
                </button>
            </div>
        </div>
    );
}
