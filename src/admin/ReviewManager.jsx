import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import "./vehicle.css"; // Reusing vehicle css for consistent styling

export default function ReviewManager() {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [reviewData, setReviewData] = useState({
    name: "",
    rating: 5,
    date: "",
    text: "",
  });

  /* ---------------- FETCH ---------------- */

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    setReviews(data || []);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  /* ---------------- ADD / UPDATE ---------------- */

  const saveReview = async (e) => {
    e.preventDefault();

    const { name, rating, date, text } = reviewData;

    if (!name || !rating || !text) {
      alert("Fill all required fields");
      return;
    }

    const payload = {
      name,
      rating: parseInt(rating),
      date,
      text,
    };

    let error;

    if (editingId) {
      ({ error } = await supabase
        .from("reviews")
        .update(payload)
        .eq("id", editingId));
    } else {
      ({ error } = await supabase.from("reviews").insert([payload]));
    }

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    resetForm();
    fetchReviews();
  };

  /* ---------------- EDIT ---------------- */

  const editReview = (r) => {
    setEditingId(r.id);
    setShowForm(true);

    setReviewData({
      name: r.name || "",
      rating: r.rating || 5,
      date: r.date || "",
      text: r.text || "",
      text: r.text || "",
    });
  };

  /* ---------------- DELETE ---------------- */

  const deleteReview = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?",
    );

    if (!confirmDelete) return;

    const { error } = await supabase.from("reviews").delete().eq("id", id);

    if (error) {
      alert("Delete failed");
      return;
    }

    fetchReviews();
  };

  /* ---------------- RESET ---------------- */

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setReviewData({
      name: "",
      rating: 5,
      date: "",
      text: "",
    });
  };

  /* ---------------- UI ---------------- */

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <>
      <h1 className="page-title">Reviews</h1>
      <p className="page-subtitle">Manage customer reviews</p>

      <button className="primary-btn" onClick={() => setShowForm(!showForm)}>
        {editingId ? "Edit Review" : "+ Add Review"}
      </button>

      {showForm && (
        <div className="section-box">
          <h3>{editingId ? "Edit Review" : "Add Review"}</h3>

          <form onSubmit={saveReview} className="form-grid">
            <input
              placeholder="Customer Name"
              value={reviewData.name}
              onChange={(e) =>
                setReviewData({ ...reviewData, name: e.target.value })
              }
              required
            />

            <select
              value={reviewData.rating}
              onChange={(e) =>
                setReviewData({ ...reviewData, rating: e.target.value })
              }
            >
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>

            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                  color: "#666",
                }}
              >
                Review Date
              </label>
              <input
                type="date"
                value={reviewData.date}
                onChange={(e) =>
                  setReviewData({ ...reviewData, date: e.target.value })
                }
                required
              />
            </div>

            <textarea
              placeholder="Review Text"
              value={reviewData.text}
              onChange={(e) =>
                setReviewData({
                  ...reviewData,
                  text: e.target.value,
                })
              }
              className="full-width"
              style={{ gridColumn: "1 / -1", minHeight: "100px" }}
              required
            />

            <button className="primary-btn">
              {editingId ? "Update Review" : "Save Review"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      )}

      {/* REVIEWS LIST */}
      <div className="card-grid">
        {reviews.map((r) => (
          <div className="card" key={r.id}>
            {/* IMAGE */}

            {/* NAME */}
            <h3 className="text-center">{r.name}</h3>

            <p>
              <strong>Rating:</strong>{" "}
              <span style={{ color: "gold" }}>{renderStars(r.rating)}</span>
            </p>
            <p>
              <strong>Date:</strong> {r.date}
            </p>

            {/* TEXT */}
            <p
              className="description"
              style={{ maxHeight: "none", WebkitLineClamp: "unset" }}
            >
              "{r.text}"
            </p>

            {/* ACTIONS */}
            <div className="card-actions">
              <button className="secondary-btn" onClick={() => editReview(r)}>
                Edit
              </button>

              <button className="danger-btn" onClick={() => deleteReview(r.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
