// import { useState } from "react";
import React, { useState } from "react";
import { data, useLocation, useNavigate, useParams } from "react-router-dom";
import destinations from "../data/destinations";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"


const DestinationDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const destination =
    location.state?.destination ||
    destinations.find((dest) => dest.slug === slug);

  const [destinationss, setDestination] = useState(destination.name);
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [email, setEmail] = useState(localStorage.getItem("user_email"));
  const [destinationReviews, setDestinationReviews] = useState([]);
  const [reviewsVisible, setReviewsVisible] = useState(false);
  if (!destination) {
    return <div className="text-center my-5">Destination not found</div>;
  }
  const Data = { "destination": destinationss, "description": description, "rating": rating, "email": email }

  const handleBookNow = (pkg) => {
    navigate("/bookpackage", {
      state: {
        destination: destination.name,
        packageName: pkg.name,
        price: pkg.price,
      },
    });
  };

  const handleSubmitReview = async () => {
    try {
      const response = await fetch("http://localhost:8000/submit-review/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        alert("Review submitted successfully!");
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      alert("Failed to submit review.");
      console.error(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/reviews/?destination=${encodeURIComponent(destination.name)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      setDestinationReviews(data);
      setReviewsVisible(true);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      alert("Could not load reviews.");
    }
  };

  const handleShowReviews = () => {
  if (!reviewsVisible) {
    fetchReviews(); // only fetch if opening
  }
  setReviewsVisible(!reviewsVisible); // toggle open/close
};



  return (
    <>
      <Navbar />
      <div className="container my-5">
  {/* 🔹 Top Video Section */}
  <div className="mb-5">
    <div className="rounded overflow-hidden shadow" style={{ height: '600px' }}>
      <video
        src={destination.videoUrl}
        autoPlay
        muted
        loop
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  </div>

  {/* 🔹 Image Carousel */}
  {destination.images?.length > 0 && (
    <div id="destinationImageCarousel" className="carousel slide mb-5 shadow rounded" data-bs-ride="carousel">
      <div className="carousel-inner">
        {destination.images.map((img, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img
              src={img}
              className="d-block w-100"
              alt={`Slide ${index + 1}`}
              style={{ height: '500px', objectFit: 'cover', borderRadius: '10px' }}
            />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#destinationImageCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#destinationImageCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )}

  {/* 🔹 Destination Title & Description */}
  <div className="mb-5">
    <h1 className="text-center fw-bold mb-3">{destination.name}</h1>
    <p className="text-muted text-center fs-5">{destination.description}</p>
  </div>

  {/* 🔹 Packages Section */}
  <h2 className="text-center text-primary mb-4">{destination.name} Packages</h2>
  <div className="row">
    {destination.packages.map((pkg, index) => (
      <div className="col-md-4 mb-4" key={index}>
        <div className="card h-100 shadow-sm border-0 rounded-4">
          <img src={pkg.image} className="card-img-top rounded-top-4" alt={pkg.name} style={{ height: 250, objectFit: 'cover' }} />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{pkg.name}</h5>
            <p className="card-text">{pkg.description}</p>
            <p className="text-success fw-bold fs-5">₹{pkg.price.toLocaleString()}</p>
            <div className="mt-auto d-flex justify-content-between">
              <button
                className="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target={`#packageModal-${index}`}
              >
                View Details
              </button>
              <button
                className="btn btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target={`#reviewModal-${index}`}
              >
                Review
              </button>
            </div>
          </div>
        </div>

        {/* 🔸 Package Details Modal */}
        <div className="modal fade" id={`packageModal-${index}`} tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content rounded-4">
              <div className="modal-header">
                <h5 className="modal-title">{pkg.name} – Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>Transport:</strong> {pkg.transport}</li>
                  <li className="list-group-item"><strong>Accommodation:</strong> {pkg.accommodation}</li>
                  <li className="list-group-item"><strong>Meals:</strong> {pkg.meals}</li>
                  <li className="list-group-item"><strong>Activities:</strong> {pkg.activities}</li>
                </ul>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={() => handleBookNow(pkg)} data-bs-dismiss="modal">
                  Book Now
                </button>
                <button className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        {/* 🔸 Review Modal */}
        <div className="modal fade" id={`reviewModal-${index}`} tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4">
              <div className="modal-header">
                <h5 className="modal-title">{pkg.name} – Submit Review</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <textarea
                  className="form-control mb-3"
                  placeholder="Write your review..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="number"
                  value={rating}
                  placeholder="Rating (1 to 5)"
                  min={1}
                  max={5}
                  className="form-control"
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button className="btn btn-primary" onClick={handleSubmitReview}>Submit Review</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* 🔹 Reviews Section */}
  <div className="mt-5">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h4 className="fw-bold">User Reviews</h4>
      <button className="btn btn-outline-primary" onClick={handleShowReviews}>{reviewsVisible ? "Hide Reviews" : "Show Reviews"}</button>
    </div>
    {reviewsVisible && (
      <div className="card shadow-sm p-3 rounded-4">
        {destinationReviews.length === 0 ? (
          <p className="text-muted">No reviews yet. Be the first to share your experience!</p>
        ) : (
          <ul className="list-group list-group-flush">
            {destinationReviews.map((review, index) => (
              <li key={index} className="list-group-item">
                <p><strong>Email:</strong> {review.email}</p>
                <p><strong>Rating:</strong> {review.rating}/5</p>
                <p><strong>Description:</strong> {review.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )}
  </div>
</div>

      <Footer />
    </>
  );
};

export default DestinationDetail;
