import { useEffect, useState } from "react"
import { supabase } from "../supabase/client"
import "./Packages.css"

const WHATSAPP_NUMBER = "918714191755"

export default function Packages() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .order("popular", { ascending: false })

    if (!error) setPackages(data || [])
    setLoading(false)
  }

  if (loading) return <p className="text-center">Loading packages...</p>

  return (
    <section id="packages" className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Tour Packages</h2>
          <p className="lead text-muted">
            Choose from our carefully curated Kerala experiences
          </p>
        </div>

        <div className="row g-4">
          {packages.map((pkg) => (
            <div key={pkg.id} className="col-lg-4">
              <div
                className={`card package-card h-100 ${
                  pkg.popular ? "popular-package" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="badge bg-success position-absolute top-0 end-0 m-3 px-3 py-2">
                    Most Popular
                  </div>
                )}

                <div className="card-body p-4">
                  <h3 className="card-title fw-bold mb-2">{pkg.name}</h3>
                  <p className="text-muted mb-4">{pkg.duration}</p>

                  <div className="price-section mb-4 pb-4 border-bottom">
                    <span className="h2 fw-bold text-success">
                      ₹{pkg.price.toLocaleString()}
                    </span>
                    <span className="text-muted"> / person</span>
                  </div>

                  <ul className="list-unstyled mb-4">
                    {pkg.highlights.map((item, idx) => (
                      <li key={idx} className="mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="btn btn-success w-100 rounded-pill py-2 fw-bold"
                    onClick={() => {
                      const message = `Hi, I'm interested in the ${pkg.name} package (${pkg.duration}) priced at ₹${pkg.price}. Please share more details.`
                      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        message
                      )}`
                      window.open(url, "_blank")
                    }}
                  >
                    WhatsApp Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
