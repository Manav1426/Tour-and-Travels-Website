import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-white mt-5 pt-4 pb-3">
        <div className="container">
          <div className="row">

            <div className="col-md-4 mb-3">
              <h5 className="fw-bold">FlyworldTours</h5>
              <p>Your ultimate travel companion for dream destinations.</p>
            </div>

            <div className="col-md-4 mb-3">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="/" className="text-white text-decoration-none">Home</a></li>
                <li><a href="/destinations" className="text-white text-decoration-none">Destinations</a></li>
                <li><a href="/aboutus" className="text-white text-decoration-none">About Us</a></li>
              </ul>
            </div>

            <div className="col-md-4 mb-3">
              <h5>Follow Us</h5>
              <div className="d-flex gap-2">
                <a href="#" className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                  <i className="bi bi-youtube"></i>
                </a>
              </div>

              <p className="mt-3 mb-0 small">
                Email: info@flyworldtours.com<br />
                Phone: +91-9876543210
              </p>
            </div>

          </div>

          <hr className="border-light" />
          <p className="text-center mb-0 small">
            &copy; {new Date().getFullYear()} FlyworldTours. All rights reserved.
          </p>
        </div>
      </footer>

    </>
  );
};

export default Footer;
