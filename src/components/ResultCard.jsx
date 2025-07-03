import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const ResultCard = ({ isEven, ad, number }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`mt-6 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className={`relative overflow-hidden rounded-2xl p-6 text-center shadow-xl ${
        isEven 
          ? 'bg-gradient-to-br from-emerald-50 to-green-100 border-2 border-emerald-200' 
          : 'bg-gradient-to-br from-rose-50 to-pink-100 border-2 border-rose-200'
      }`}>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-2 left-2 w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="absolute bottom-3 left-6 w-1 h-1 bg-white/50 rounded-full"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <div className={`p-3 rounded-full ${
              isEven ? 'bg-emerald-500/20' : 'bg-rose-500/20'
            }`}>
              {isEven ? (
                <CheckCircle className="text-emerald-600 w-8 h-8 sm:w-10 sm:h-10" />
              ) : (
                <XCircle className="text-rose-600 w-8 h-8 sm:w-10 sm:h-10" />
              )}
            </div>
          </div>
          
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
            El número{' '}
            <span className={`inline-block px-3 py-1 rounded-full text-white font-extrabold ${
              isEven ? 'bg-emerald-500' : 'bg-rose-500'
            }`}>
              {number}
            </span>
            {' '}{isEven ? 'es par' : 'no es par'}
          </h2>
          
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
            isEven 
              ? 'bg-emerald-500 text-white' 
              : 'bg-rose-500 text-white'
          }`}>
            {isEven ? 'NÚMERO PAR' : 'NÚMERO IMPAR'}
          </div>
          
          {ad && (
            <p className="text-xs sm:text-sm text-gray-600 mt-4 p-3 bg-white/60 rounded-xl italic border border-white/40">
              {ad}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;