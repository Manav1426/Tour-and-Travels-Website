import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Mybooking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    setError("");

    const email = localStorage.getItem("user_email");
    console.log("Email from localStorage:", email);

    if (!email) {
      setError("User email not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/my-bookings/?email=${encodeURIComponent(email)}`);
      const data = await res.json();

      console.log("API response:", data);

      if (res.ok && Array.isArray(data.bookings)) {
        setBookings(data.bookings);
      } else if (data.message) {
        setError(data.message);
        setBookings([]);
      } else {
        setError("Unexpected response from server.");
        setBookings([]);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Error fetching bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔽 Call fetchBookings() once when the page loads
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-center mb-4">My Bookings</h2>

        {loading && (
          <div className="text-center mb-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}

        <div className="row g-4">
          {bookings.length === 0 && !loading && !error ? (
            <div className="col-12">
              <div className="alert alert-info text-center">
                No bookings found.
              </div>
            </div>
          ) : (
            bookings.map((booking, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div
                  className="card shadow rounded-4 h-100 border-0"
                  style={{ backgroundColor: "#f9f9f9" }}
                >
                  <div className="card-body">
                    <h5 className="card-title mb-3 text-primary fw-bold">
                      ✈️ {booking.destination}
                    </h5>
                    <p className="mb-2">
                      <strong className="text-success">Package:</strong>{" "}
                      {booking.package}
                    </p>
                    <p className="mb-2">
                      <strong className="text-success">Travel Date:</strong>{" "}
                      {booking.travel_date}
                    </p>
                    <p className="mb-3">
                      <strong className="text-success">Total Travelers:</strong>{" "}
                      {booking.travelers}
                    </p>
                    <div>
                      <strong className="text-success">Traveler Details:</strong>
                      <ul className="list-group list-group-flush mt-2">
                        {booking.traveler_details?.map((traveler, tIndex) => (
                          <li
                            key={tIndex}
                            className="list-group-item rounded-3 shadow-sm mb-2"
                            style={{
                              backgroundColor: "#ffffff",
                              borderLeft: "5px solid #0d6efd",
                            }}
                          >
                            <div>
                              <span className="fw-bold text-dark">👤 Name:</span>{" "}
                              <span className="text-secondary">{traveler.name}</span>
                            </div>
                            <div>
                              <span className="fw-bold text-dark">🎂 Age:</span>{" "}
                              <span className="text-secondary">{traveler.age}</span>
                            </div>
                            <div>
                              <span className="fw-bold text-dark">🚻 Gender:</span>{" "}
                              <span className="text-secondary">{traveler.gender}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Mybooking;
