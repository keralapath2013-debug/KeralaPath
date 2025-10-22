import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay"></div>
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center text-center">
          <div className="col-lg-10">
            <h1 className="display-3 fw-bold text-white mb-4 hero-title">
              Discover God's Own Country
            </h1>
            <p className="lead text-white mb-5 hero-subtitle">
              Experience the enchanting backwaters, lush tea gardens, and vibrant culture of Kerala
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <a href="#packages" className="btn btn-light btn-lg px-5 rounded-pill">
                Explore Packages
              </a>
              <a href="#contact" className="btn btn-outline-light btn-lg px-5 rounded-pill">
                Plan Your Trip
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
