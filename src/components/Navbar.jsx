import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDestinationToggle = () => {
  !isDropdownOpen && console.log("Fetching destinations...");
  setIsDropdownOpen(!isDropdownOpen);
};

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3 position-relative">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand fw-bold text-success fs-3">Flyworld Tours</span>

        <div className="d-flex align-items-center gap-3">
          <Link to="/Home" className="nav-link">Home</Link>
          <Link to="/aboutus" className="nav-link">AboutUs</Link>
          
          {/* <Link to="/signup" className="nav-link">Signup</Link> */}

          {/* Destinations Dropdown */}
          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              onClick={() => handleDestinationToggle(!isDropdownOpen)}
            >
              Destinations
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu show position-absolute end-0 mt-2 p-3 shadow rounded" style={{ width: '18rem' }}>
                <div className="mb-3">
                  <h6 className="dropdown-header">🇮🇳 Indian Destinations</h6>
                  <Link to="/destinations/kashmir" className="dropdown-item">Kashmir</Link>
                  <Link to="/destinations/goa" className="dropdown-item">Goa</Link>
                  <Link to="/destinations/manali" className="dropdown-item">Manali</Link>
                  <Link to="/destinations/lakshadweep" className="dropdown-item">Lakshadweep</Link>
                  <Link to="/destinations/andaman" className="dropdown-item">Andaman & Nicobar</Link>
                  <Link to="/destinations/udaipur" className="dropdown-item">Udaipur</Link>
                  <Link to="/destinations/gujarat" className="dropdown-item">Gujarat</Link>
                  <Link to="/destinations/lonavala" className="dropdown-item">Lonavala</Link>
                  <Link to="/destinations/mp" className="dropdown-item">Madhya Pradesh</Link>
                </div>

                {/* International Destinations */}
                <div>
                  <h6 className="dropdown-header">🌍 International Destinations</h6>
                  <Link to="/destinations/london" className="dropdown-item">London</Link>
                  <Link to="/destinations/singapore" className="dropdown-item">Singapore</Link>
                  <Link to="/destinations/bali" className="dropdown-item">Bali</Link>
                  <Link to="/destinations/maldives" className="dropdown-item">Maldives</Link>
                  <Link to="/destinations/thailand" className="dropdown-item">Thailand</Link>
                  <Link to="/destinations/greece" className="dropdown-item">Greece</Link>
                  <Link to="/destinations/newzealand" className="dropdown-item">New Zealand</Link>
                  <Link to="/destinations/australia" className="dropdown-item">Australia</Link>
                  <Link to="/destinations/southafrica" className="dropdown-item">South Africa</Link>
                  <Link to="/destinations/egypt" className="dropdown-item">Egypt</Link>
                  <Link to="/destinations/germany" className="dropdown-item">Germany</Link>
                  <Link to="/destinations/italy" className="dropdown-item">Italy</Link>
                  <Link to="/destinations/paris" className="dropdown-item">Paris</Link>
                </div>
              </div>
            )}
          </div>
          <Link to="/my-bookings" className="nav-link">MyBooking</Link>
          <Link to="/signup" className="nav-link">Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
