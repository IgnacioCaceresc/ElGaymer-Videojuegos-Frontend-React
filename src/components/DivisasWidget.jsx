import { useState, useEffect } from 'react';

const DivisasWidget = () => {
  const [indicadores, setIndicadores] = useState(null);

  useEffect(() => {
    // API de Mindicador (Valores actualizados para Chile)
    fetch('https://mindicador.cl/api')
      .then(response => response.json())
      .then(data => {
        setIndicadores({
          dolar: data.dolar.valor,
          euro: data.euro.valor
        });
      })
      .catch(() => {
        // Fallback silencioso por si falla la API
        setIndicadores(null);
      });
  }, []);

  // Si aún no carga o falla, no mostramos nada para no romper el diseño
  if (!indicadores) return null;

  return (
    <div 
      className="d-none d-lg-flex align-items-center me-3 px-3 py-1 rounded" 
      style={{ backgroundColor: 'rgba(255,255,255,0.1)', fontSize: '0.85rem' }}
      title="Indicadores consumidos de mindicador.cl"
    >
      <i className="bi bi-currency-exchange text-white me-2"></i>
      <span className="me-3 text-white">USD: <strong className="text-success">${indicadores.dolar}</strong></span>
      <span className="text-white">EUR: <strong className="text-info">${indicadores.euro}</strong></span>
    </div>
  );
};

export default DivisasWidget;
