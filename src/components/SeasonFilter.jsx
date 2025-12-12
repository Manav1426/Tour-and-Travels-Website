import React, { useState } from "react";

const SeasonFilter = ({ onChange }) => {
  const [active, setActive] = useState("monsoon");

  const handleClick = (filter) => {
    setActive(filter);
    onChange(filter);
  };

  return (
    <div className="d-flex gap-2 bg-light p-2 rounded-pill">
      <button
        className={`btn btn-sm rounded-pill ${active === "monsoon" ? "btn-dark text-white" : "btn-light"}`}
        onClick={() => handleClick("monsoon")}
      >
        Monsoon Special
      </button>
      <button
        className={`btn btn-sm rounded-pill ${active === "summer" ? "btn-dark text-white" : "btn-light"}`}
        onClick={() => handleClick("summer")}
      >
        Summer Special
      </button>
      <button
        className={`btn btn-sm rounded-pill ${active === "winter" ? "btn-dark text-white" : "btn-light"}`}
        onClick={() => handleClick("winter")}
      >
        Winter Special
      </button>
    </div>
  );
};

export default SeasonFilter;
