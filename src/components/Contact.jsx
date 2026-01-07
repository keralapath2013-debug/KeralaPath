import { useState } from "react";
import { supabase } from "../supabase/client";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("contacts").insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      }
    ]);

    if (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } else {
      alert("Thank you! Your message has been sent.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Get In Touch</h2>
          <p className="lead text-muted">
            Ready to start your Kerala adventure? Contact us today!
          </p>
        </div>

        <div className="row g-5">
          {/* LEFT INFO */}
          <div className="col-lg-5">
            <div className="row g-4">
              {[
                { icon: "📍", title: "Visit Us", text: "KeralaPath ,Near Lighthouse, Puthuvype,Ernakulam 682508" },
                { icon: "📞", title: "Call Us", text: "+91 87141 91755" },
                { icon: "✉️", title: "Email Us", text: "keralapath2013@gmail.com" },
                { icon: "🕐", title: "Working Hours", text: "24/7 Hours" }
              ].map((item, i) => (
                <div className="col-12" key={i}>
                  <div className="card border-0 shadow-sm p-3">
                    <div className="d-flex align-items-start">
                      <div className="fs-3 text-success me-3">{item.icon}</div>
                      <div>
                        <h5 className="fw-bold mb-2">{item.title}</h5>
                        <p className="text-muted mb-0">{item.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FORM */}
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
                  />
                </div>

                <div className="mb-4">
                  <textarea
                    className="form-control form-control-lg"
                    rows="5"
                    name="message"
                    placeholder="Tell us about your travel plans..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100 rounded-pill fw-bold"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
