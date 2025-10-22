import './Footer.css';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-3 text-white">Springs of Kerala</h5>
            <p className="text-light opacity-75">
              Your gateway to unforgettable Kerala experiences. Discover the magic of God's Own Country with us.
            </p>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-3 text-white">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#home" className="text-light text-decoration-none opacity-75">Home</a></li>
              <li className="mb-2"><a href="#destinations" className="text-light text-decoration-none opacity-75">Destinations</a></li>
              <li className="mb-2"><a href="#packages" className="text-light text-decoration-none opacity-75">Packages</a></li>
              <li className="mb-2"><a href="#about" className="text-light text-decoration-none opacity-75">About Us</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-3 text-white">Contact</h5>
            <ul className="list-unstyled text-light opacity-75">
              <li className="mb-2">MG Road, Kochi</li>
              <li className="mb-2">Kerala, India 682016</li>
              <li className="mb-2">+91 484 123 4567</li>
              <li className="mb-2">info@springsofkerala.com</li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-3 text-white">Follow Us</h5>
            <div className="d-flex flex-column gap-2">
              <a href="#" className="text-light text-decoration-none opacity-75">Facebook</a>
              <a href="#" className="text-light text-decoration-none opacity-75">Instagram</a>
              <a href="#" className="text-light text-decoration-none opacity-75">Twitter</a>
            </div>
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        <div className="text-center text-light opacity-75">
          <p className="mb-0">&copy; 2025 Springs of Kerala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
