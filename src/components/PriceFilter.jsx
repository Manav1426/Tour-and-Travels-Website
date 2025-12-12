import React, { useState } from "react";

const PriceFilter = ({ onChange }) => {
    const [active, setActive] = useState("0-100000");

    const handleClick = (range) => {
        setActive(range);
        onChange(range);
    };

    return (
        <div className="d-flex gap-2 bg-light p-2 rounded-pill">
            <button
                className={`btn btn-sm rounded-pill ${active === "0-100000" ? "btn-dark text-white" : "btn-light"}`}
                onClick={() => handleClick("0-100000")}
            >
                ₹0 - ₹100000
            </button>
            <button
                className={`btn btn-sm rounded-pill ${active === "100000-200000" ? "btn-dark text-white" : "btn-light"}`}
                onClick={() => handleClick("100000-200000")}
            >
                ₹100000 - ₹200000
            </button>
            <button
                className={`btn btn-sm rounded-pill ${active === "200000+" ? "btn-dark text-white" : "btn-light"}`}
                onClick={() => handleClick("200000+")}
            >
                ₹200000+
            </button>
        </div>
    );
};

export default PriceFilter;
