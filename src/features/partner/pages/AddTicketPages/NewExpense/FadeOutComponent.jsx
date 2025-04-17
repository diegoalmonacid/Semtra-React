import { useState, useEffect } from "react";

export const FadeOutComponent = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Desvanecer después de 5 segundos
    setIsVisible(true);
    const timer = setTimeout(() => setIsVisible(false), 2000);
    
    return () => clearTimeout(timer); // Limpia el temporizador al desmontar
  }, [message]);

  return (
    <div
      className={`transition-opacity duration-1000 fixed left-0 top-0 z-10 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {message && <p className="p-4 bg-blue-600 text-white rounded-md">
        {message}
      </p>}
    </div>
  );
};