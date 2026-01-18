import "./About.css";
import aboutImage from "../assets/about.webp";

export default function About() {
  return (
    <section id="about" className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h2 className="display-5 fw-bold mb-4">About KeralaPath</h2>
            <p className="lead mb-4">
              At KeralaPath Tours & Travels, we create seamless travel
              experiences across Kerala, combining comfort, reliability, and
              local expertise to help you explore God’s Own Country with ease.
            </p>

            <p className="mb-4">
              With professional cab services and thoughtfully planned tours, we
              cater to airport transfers, sightseeing, and popular destinations,
              ensuring every journey is safe, personalized, and truly enjoyable.
            </p>

            <div className="row g-4 mt-4">
              <div className="col-sm-4">
                <div className="text-center">
                  <h3 className="display-6 fw-bold text-success">10+</h3>
                  <p className="text-muted">Years Experience</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="text-center">
                  <h3 className="display-6 fw-bold text-success">50+</h3>
                  <p className="text-muted">Destinations</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="text-center">
                  <h3 className="display-6 fw-bold text-success">5000+</h3>
                  <p className="text-muted">Happy Travelers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <img
              src={aboutImage}
              alt="Kerala Tourism"
              className="img-fluid rounded shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
