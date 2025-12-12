import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookPackages = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    destination: bookingData?.destination || "",
    package: bookingData?.packageName || "",
    price: bookingData?.price || 0,
    travelDate: "",
    travelers: 1,
    travelerDetails: [{ name: "", age: "", gender: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "travelers") {
      const count = parseInt(value, 10);
      const newTravelerDetails = Array.from({ length: count }, (_, i) =>
        formData.travelerDetails[i] || { name: "", age: "", gender: "" }
      ).slice(0, count);
      setFormData((prev) => ({
        ...prev,
        travelers: count,
        travelerDetails: newTravelerDetails,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTravelerChange = (index, field, value) => {
    const updated = [...formData.travelerDetails];
    updated[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      travelerDetails: updated,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/bookpackage/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Booking submitted!");
        navigate("/my-bookings");
      } else {
        alert(data.error || "Booking failed.");
      }
    } catch (err) {
      alert("Error submitting booking.");
    }
  };

  if (!bookingData) {
    return <p className="text-center mt-5">No package selected for booking.</p>;
  }

  return (
    <div className="container mt-5 p-4 shadow-lg rounded bg-white">
  <h2 className="mb-4 text-center fw-bold text-primary">Book Your Dream Package</h2>
  <form onSubmit={handleSubmit} className="row g-4">
    {/* Basic Details */}
    <div className="col-md-6">
      <label className="form-label fw-semibold">Full Name</label>
      <input type="text" className="form-control shadow-sm" name="name" required value={formData.name} onChange={handleChange} />
    </div>
    <div className="col-md-6">
      <label className="form-label fw-semibold">Email</label>
      <input type="email" className="form-control shadow-sm" name="email" required value={formData.email} onChange={handleChange} />
    </div>
    <div className="col-md-6">
      <label className="form-label fw-semibold">Mobile Number</label>
      <input type="text" className="form-control shadow-sm" name="mobile" required value={formData.mobile} onChange={handleChange} />
    </div>
    <div className="col-md-6">
      <label className="form-label fw-semibold">Travel Date</label>
      <input type="date" className="form-control shadow-sm" name="travelDate" required value={formData.travelDate} onChange={handleChange} />
    </div>

    {/* Package Info (ReadOnly) */}
    <div className="col-md-4">
      <label className="form-label fw-semibold">Destination</label>
      <input type="text" className="form-control shadow-sm" name="destination" value={formData.destination} readOnly />
    </div>
    <div className="col-md-4">
      <label className="form-label fw-semibold">Package</label>
      <input type="text" className="form-control shadow-sm" name="package" value={formData.package} readOnly />
    </div>
    <div className="col-md-4">
      <label className="form-label fw-semibold">Price</label>
      <input type="text" className="form-control shadow-sm" name="price" value={formData.price} readOnly />
    </div>

    {/* Number of Travelers */}
    <div className="col-12">
      <label className="form-label fw-semibold">No. of Travelers</label>
      <input
        type="number"
        className="form-control shadow-sm"
        name="travelers"
        min="1"
        value={formData.travelers}
        onChange={handleChange}
      />
    </div>

    {/* Traveler Details */}
    {formData.travelerDetails.map((traveler, index) => (
      <div key={index} className="border rounded p-3 mt-3 bg-light shadow-sm">
        <h5 className="text-secondary mb-3">Traveler {index + 1} Details</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={traveler.name}
              onChange={(e) => handleTravelerChange(index, "name", e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              value={traveler.age}
              onChange={(e) => handleTravelerChange(index, "age", e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Gender</label>
            <select
              className="form-control"
              value={traveler.gender}
              onChange={(e) => handleTravelerChange(index, "gender", e.target.value)}
              required
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>
    ))}

    {/* Submit */}
    <div className="col-12">
      <button type="submit" className="btn btn-primary w-100 fw-bold fs-5 shadow">
        Confirm Booking
      </button>
    </div>
  </form>
</div>

  );
};

export default BookPackages;
