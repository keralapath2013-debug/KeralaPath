import { useEffect, useState } from "react"
import { supabase } from "../supabase/client"
import "./PackagesManager.css"

export default function PackagesManager() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    name: "",
    duration: "",
    price: "",
    highlights: "",
    popular: false,
  })

  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchPackages()
  }, [])

  /* ---------------- FETCH ---------------- */
  const fetchPackages = async () => {
    const { data } = await supabase
      .from("packages")
      .select("*")
      .order("created_at", { ascending: false })

    setPackages(data || [])
    setLoading(false)
  }

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      name: form.name,
      duration: form.duration,
      price: form.price,
      popular: form.popular,
      highlights: form.highlights.split(",").map(h => h.trim()),
    }

    if (editingId) {
      await supabase.from("packages").update(payload).eq("id", editingId)
    } else {
      await supabase.from("packages").insert(payload)
    }

    resetForm()
    fetchPackages()
  }

  /* ---------------- EDIT ---------------- */
  const handleEdit = (pkg) => {
    setEditingId(pkg.id)
    setForm({
      name: pkg.name,
      duration: pkg.duration,
      price: pkg.price,
      highlights: pkg.highlights.join(", "),
      popular: pkg.popular,
    })
  }

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return
    await supabase.from("packages").delete().eq("id", id)
    fetchPackages()
  }

  const resetForm = () => {
    setEditingId(null)
    setForm({
      name: "",
      duration: "",
      price: "",
      highlights: "",
      popular: false,
    })
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="admin-packages">
      <h2>Manage Tour Packages</h2>

      {/* FORM */}
      <form className="package-form" onSubmit={handleSubmit}>
        <input
          placeholder="Package name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Duration (eg: 3 Days / 2 Nights)"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <textarea
          placeholder="Highlights (comma separated)"
          value={form.highlights}
          onChange={(e) => setForm({ ...form, highlights: e.target.value })}
          required
        />

        <label className="checkbox">
          <input
            type="checkbox"
            checked={form.popular}
            onChange={(e) => setForm({ ...form, popular: e.target.checked })}
          />
          Mark as Popular
        </label>

        <button type="submit">
          {editingId ? "Update Package" : "Add Package"}
        </button>

        {editingId && (
          <button type="button" className="cancel-btn" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="package-list">
          {packages.map((pkg) => (
            <div key={pkg.id} className="package-item">
              <div>
                <h4>{pkg.name}</h4>
                <p>{pkg.duration}</p>
                <p>₹{pkg.price}</p>
                {pkg.popular && <span className="badge">Popular</span>}
              </div>

              <div className="package-actions">
  <button className="btn btn-edit" onClick={() => handleEdit(pkg)}>
    ✏️ Edit
  </button>

  <button className="btn btn-delete" onClick={() => handleDelete(pkg.id)}>
    🗑 Delete
  </button>
</div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}
