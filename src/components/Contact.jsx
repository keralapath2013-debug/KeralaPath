import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Get In Touch</h2>
          <p className="lead text-muted">Ready to start your Kerala adventure? Contact us today!</p>
        </div>

        <div className="row g-5">
          <div className="col-lg-5">
            <div className="row g-4">
              <div className="col-12">
                <div className="card border-0 shadow-sm p-3">
                  <div className="d-flex align-items-start">
                    <div className="fs-3 text-success me-3">📍</div>
                    <div>
                      <h5 className="fw-bold mb-2">Visit Us</h5>
                      <p className="text-muted mb-0">MG Road, Kochi<br />Kerala, India 682016</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card border-0 shadow-sm p-3">
                  <div className="d-flex align-items-start">
                    <div className="fs-3 text-success me-3">📞</div>
                    <div>
                      <h5 className="fw-bold mb-2">Call Us</h5>
                      <p className="text-muted mb-0">+91 484 123 4567<br />+91 98765 43210</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card border-0 shadow-sm p-3">
                  <div className="d-flex align-items-start">
                    <div className="fs-3 text-success me-3">✉️</div>
                    <div>
                      <h5 className="fw-bold mb-2">Email Us</h5>
                      <p className="text-muted mb-0">keralapath2013@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card border-0 shadow-sm p-3">
                  <div className="d-flex align-items-start">
                    <div className="fs-3 text-success me-3">🕐</div>
                    <div>
                      <h5 className="fw-bold mb-2">Working Hours</h5>
                      <p className="text-muted mb-0">Monday - Saturday<br />9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card border-0 shadow-sm p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="tel"
                    className="form-control form-control-lg"
                    name="phone"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <textarea
                    className="form-control form-control-lg"
                    name="message"
                    rows="5"
                    placeholder="Tell us about your travel plans..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-success btn-lg w-100 rounded-pill fw-bold">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
