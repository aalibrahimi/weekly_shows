import React, { useState, useEffect } from 'react';

const LoadingBarExact = () => {
  const [progress, setProgress] = useState(60);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => prev >= 100 ? 0 : prev + 1);
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  // Calculate filled segments based on progress
  const totalSegments = 25; // Exact number from image
  const filledSegments = Math.floor((progress / 100) * totalSegments);
  
  return (
    <div className="flex items-center justify-center w-full bg-black p-8">
      <div className="relative w-full max-w-md mx-auto">
        {/* Shadow effect for red glow */}
        <div 
          className="absolute -inset-1 opacity-70 blur-md"
          style={{ backgroundColor: '#500' }}
        />
        
        {/* Main bar container */}
        <div 
          className="relative"
          style={{ 
            boxShadow: '0 0 8px rgba(255,0,0,0.6)',
          }}
        >
          {/* Border container */}
          <div 
            className="h-8 bg-black border-2 overflow-hidden"
            style={{ 
              borderColor: '#ff0000',
            }}
          >
            {/* Inner black area with padding */}
            <div className="w-full h-full bg-black p-0.5">
              {/* Segments container */}
              <div className="w-full h-full flex">
                {Array.from({ length: totalSegments }).map((_, index) => (
                  <div 
                    key={index}
                    className="h-full"
                    style={{ 
                      width: `calc(100% / ${totalSegments})`,
                      backgroundColor: index < filledSegments ? '#ff0000' : '#1a0000',
                      borderRight: index === totalSegments - 1 ? 'none' : '1px solid #000',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBarExact;