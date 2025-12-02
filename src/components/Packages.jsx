import './Packages.css';

const packages = [
  {
    name: 'Backwater Bliss',
    duration: '3 Days / 2 Nights',
    price: '15,999',
    highlights: ['Houseboat stay', 'Traditional Kerala cuisine', 'Village tour', 'Sunset cruise'],
    popular: false
  },
  {
    name: 'Hill Station Retreat',
    duration: '5 Days / 4 Nights',
    price: '24,999',
    highlights: ['Tea plantation visit', 'Munnar & Wayanad', 'Wildlife safari', 'Trekking adventure'],
    popular: true
  },
  {
    name: 'Complete Kerala',
    duration: '7 Days / 6 Nights',
    price: '38,999',
    highlights: ['All major destinations', 'Houseboat & resorts', 'Cultural experiences', 'Ayurvedic spa'],
    popular: false
  }
];

export default function Packages() {
  return (
    <section id="packages" className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Tour Packages</h2>
          <p className="lead text-muted">Choose from our carefully curated Kerala experiences</p>
        </div>

        <div className="row g-4">
          {packages.map((pkg, index) => (
            <div key={index} className="col-lg-4">
              <div className={`card package-card h-100 ${pkg.popular ? 'popular-package' : ''}`}>
                {pkg.popular && (
                  <div className="badge bg-success position-absolute top-0 end-0 m-3 px-3 py-2">
                    Most Popular
                  </div>
                )}
                <div className="card-body p-4">
                  <h3 className="card-title fw-bold mb-2">{pkg.name}</h3>
                  <p className="text-muted mb-4">{pkg.duration}</p>

                  <div className="price-section mb-4 pb-4 border-bottom">
                    <span className="h2 fw-bold text-success">₹{pkg.price}</span>
                    <span className="text-muted">/person</span>
                  </div>

                  <ul className="list-unstyled mb-4">
                    {pkg.highlights.map((highlight, idx) => (
                      <li key={idx} className="mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <button className="btn btn-success w-100 rounded-pill py-2 fw-bold">
                    Whatsapp now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
