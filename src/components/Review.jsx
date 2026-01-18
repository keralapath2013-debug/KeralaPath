"use client";

import "./Review.css";
import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";

export default function Review() {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setReviews(data);
    };

    fetchReviews();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: 5,
    text: "",
  });

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const formatDate = (dateString) => {
    if (!dateString) return "";

    // Check if it's already a relative string (legacy data)
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(dateString) &&
      !/^\d{4}-\d{2}-\d{2}T/.test(dateString)
    ) {
      return dateString;
    }

    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60)
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4)
      return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12)
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  };

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rating" ? Number.parseInt(value) : value,
    });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (formData.name && formData.location && formData.text) {
      const newReview = {
        id: reviews.length + 1,
        name: formData.name,
        location: formData.location,
        rating: formData.rating,
        date: "Just now",
        text: formData.text,
        image:
          "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      };
      setReviews([newReview, ...reviews]);
      setFormData({ name: "", location: "", rating: 5, text: "" });
      setShowWriteReview(false);
    }
  };

  return (
    <section id="reviews" className="review-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="review-title">Customer Reviews</h2>
          <p className="review-subtitle">
            See what travelers say about our premium vehicle rental services
          </p>
        </div>

        <div className="row mb-5">
          <div className="col-lg-12">
            <div className="rating-summary">
              <div className="rating-box">
                <div className="rating-number">{averageRating}</div>
                <div className="rating-stars">
                  {renderStars(Math.round(averageRating))}
                </div>
                <div className="rating-count">
                  Based on {reviews.length} reviews
                </div>
              </div>
              <a href="https://g.page/r/Ce4PAhRwOFPHEBM/review">
                <button className="btn btn-write-review">
                  <i className="bi bi-pencil-square"></i> Write a Review
                </button>
              </a>
            </div>
          </div>
        </div>

        {showWriteReview && (
          <div className="write-review-modal">
            <div className="write-review-form">
              <div className="form-header">
                <h3>Share Your Experience</h3>
                <button
                  className="close-btn"
                  onClick={() => setShowWriteReview(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmitReview}>
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Rating *</label>
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-btn ${formData.rating >= star ? "active" : ""}`}
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Review *</label>
                  <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleFormChange}
                    placeholder="Share your experience with us..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-success btn-submit">
                  <a href=""></a>
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="reviews-scroll-section">
          <h3 className="scroll-section-title">Latest Reviews</h3>
          <div className="reviews-horizontal-scroll">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                renderStars={renderStars}
                formatDate={formatDate}
              />
            ))}
          </div>
        </div>

        {showAllReviews && (
          <div className="all-reviews-horizontal">
            <h3 className="all-reviews-title">All Customer Reviews</h3>
            <div className="reviews-horizontal-scroll-full">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  renderStars={renderStars}
                  formatDate={formatDate}
                />
              ))}
            </div>
          </div>
        )}

        {reviews.length > 0 && (
          <div className="text-center mt-5">
            <button
              className="btn btn-success btn-lg px-5"
              onClick={() => setShowAllReviews(!showAllReviews)}
            >
              {showAllReviews
                ? "Show Less"
                : `View All Reviews (${reviews.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewCard({ review, renderStars, formatDate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150; // Character limit

  const toggleReadMore = () => setIsExpanded(!isExpanded);

  const shouldTruncate = review.text.length > maxLength;
  const displayedText =
    isExpanded || !shouldTruncate
      ? review.text
      : `${review.text.slice(0, maxLength)}...`;

  return (
    <div className="review-card-horizontal">
      <div className="review-header">
        <div className="reviewer-info" style={{ marginLeft: 0 }}>
          <h5 className="reviewer-name">{review.name}</h5>
        </div>
      </div>

      <div className="review-rating mb-2">{renderStars(review.rating)}</div>

      <p className="review-date">{formatDate(review.date)}</p>

      <p className="review-text">
        {displayedText}
        {shouldTruncate && (
          <span
            onClick={toggleReadMore}
            style={{
              color: "#28a745",
              cursor: "pointer",
              fontWeight: "bold",
              marginLeft: "5px",
            }}
          >
            {isExpanded ? "Show Less" : "Read More"}
          </span>
        )}
      </p>
    </div>
  );
}
