import React, { useState } from 'react';
import { Calculator, Sparkles, Zap } from 'lucide-react';
import ResultCard from './components/ResultCard';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center mt-6">
    <div className="relative">
      <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-indigo-500 animate-pulse" />
    </div>
    <span className="ml-3 text-gray-600 animate-pulse">Consultando la API...</span>
  </div>
);

function App() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkEven = async () => {
    if (!number || number.trim() === '') {
      setError('Por favor ingresa un número válido');
      return;
    }
    
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const res = await fetch(`https://api.isevenapi.xyz/api/iseven/${number}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError('Ocurrió un error al consultar la API. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkEven();
    }
  };

  const clearAll = () => {
    setNumber('');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 sm:p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-indigo-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-200/30 rounded-full blur-xl"></div>
      </div>
      
      <div className="relative z-10 bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-6 sm:p-8 w-full max-w-md border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg">
              <Calculator className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Verificador de Números
          </h1>
          <p className="text-gray-600 text-sm">Descubre si tu número es par o impar</p>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="number"
              placeholder="Ingresa un número"
              className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 text-center text-xl transition-all duration-300 bg-white/70 backdrop-blur-sm"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <Zap className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={checkEven}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              {loading ? 'Verificando...' : '¿Es par?'}
            </button>
            
            {(number || result || error) && (
              <button
                onClick={clearAll}
                className="px-4 py-3 rounded-2xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-all duration-300 hover:shadow-md"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Results Section */}
        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-center">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}
        
        {result && (
          <ResultCard 
            isEven={result.iseven} 
            ad={result.ad} 
            number={number} 
          />
        )}
      </div>
    </div>
  );
}

export default App;