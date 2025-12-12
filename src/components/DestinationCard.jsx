import React from "react";
import { Link } from "react-router-dom";

const DestinationCard = ({ image, name, packages, price }) => {
  // Create a URL-friendly route path from the name
  const path = `/destinations/${name.toLowerCase().replace(/\s+/g, "")}`;

  return (
    <div className="card" style={{ minWidth: "200px" }}>
      <Link to={path}>
        <img
          src={image}
          alt={name}
          className="card-img-top rounded"
          style={{ height: "200px", objectFit: "cover" }}
        />
      </Link>
      <div className="card-body">
        <h5 className="card-title fw-bold">{name}</h5>
        <p className="card-text text-muted small">{packages} Packages</p>
        <p className="card-text text-success fw-semibold">
          From ₹{price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default DestinationCard;
