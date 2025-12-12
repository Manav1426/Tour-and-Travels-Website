import React, { useState } from "react";

const FilterBar = ({ onChange }) => {
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
        className={`btn btn-sm rounded-pill ${active === "diwali" ? "btn-dark text-white" : "btn-light"}`}
        onClick={() => handleClick("diwali")}
      >
        Diwali Special
      </button>
    </div>
  );
};

export default FilterBar;
