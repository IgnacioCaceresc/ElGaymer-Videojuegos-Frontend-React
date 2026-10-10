import { useState, useEffect } from 'react';

const DealsWidget = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obteniendo datos reales desde la API pública de CheapShark
    const fetchDeals = async () => {
      try {
        const response = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&sortBy=DealRating&pageSize=4');
        if (!response.ok) {
          throw new Error('No se pudo conectar con la API externa');
        }
        const data = await response.json();
        setDeals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) return <div className="text-center py-3"><span className="spinner-border spinner-border-sm text-primary"></span> Cargando ofertas externas...</div>;
  if (error) return <div className="alert alert-warning text-center">Aviso: {error}</div>;

  return (
    <section className="mb-5 py-4 bg-light p-4 rounded shadow-sm border border-info">
      <div className="text-center mb-4">
        <h3 className="fw-bold text-info"><i className="bi bi-globe"></i> Ofertas Digitales en la Web (API Externa)</h3>
        <p className="text-muted small">Estos datos son consumidos en tiempo real desde la API pública de CheapShark.</p>
      </div>

      <div className="row g-3">
        {deals.map(deal => (
          <div key={deal.dealID} className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <img src={deal.thumb} className="card-img-top" alt={deal.title} style={{ height: '120px', objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column text-center p-2">
                <h6 className="card-title fw-bold mb-1" style={{ fontSize: '0.9rem' }}>{deal.title}</h6>
                <div className="mt-auto">
                  <span className="text-decoration-line-through text-muted small me-2">${deal.normalPrice}</span>
                  <span className="text-success fw-bold">${deal.salePrice} USD</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DealsWidget;
