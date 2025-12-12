import React, { useState } from "react";
import DestinationCard from "../components/DestinationCard";
import FilterBar from "../components/FilterBar";
import PriceFilter from "../components/PriceFilter";
import SeasonFilter from "../components/SeasonFilter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"


// All destinations with 'tag' added
const allDestinations = [
  {
    name: "South Africa",
    image: "Sf.jpg",
    packages: 13,
    price: 84650,
    tag: "monsoon",
  },
  {
    name: "Bali",
    image: "bali.jpg",
    packages: 13,
    price: 50000,
    tag: "monsoon",
  },
  {
    name: "Japan",
    image: "Japan.webp",
    packages: 9,
    price: 228170,
    tag: "diwali",
  },
  {
    name: "All Of Europe",
    image: "Europe.avif",
    packages: 14,
    price: 206370,
    priceRange: "From ₹100000 to ₹200000",
    tag: "monsoon",
  },
  {
    name: "New Zealand",
    image: "Newzeland.jpg",
    packages: 39,
    price: 118020,
    tag: "diwali",
  },
  {
    name: "Vietnam",
    image: "Veitnam.webp",
    packages: 25,
    price: 18880,
    tag: "monsoon",
  },
  {
    name: "UAE - Dubai",
    image: "Dubai.webp",
    packages: 17,
    price: 48110,
    tag: "diwali",
  },
  {
    name: "Singapore",
    image: "Singapore.avif",
    packages: 35,
    price: 50690,
    tag: "diwali",
  },
];

const honeymoon = [
  {
    name: "Paris",
    image: "paris_h.jpg",
    packages: 13,
    price: 84650,
    tag: "monsoon",
  },
  {
    name: "Manali",
    image: "manali_h.jpg",
    packages: 13,
    price: 50000,
    tag: "monsoon",
  },
  {
    name: "Santorini",
    image: "santorini.webp",
    packages: 9,
    price: 228170,
    tag: "diwali",
  },
  {
    name: "Switzerland",
    image: "switzerland-h.jpg",
    packages: 14,
    price: 206370,
    priceRange: "From ₹100000 to ₹200000",
    tag: "monsoon",
  },
  {
    name: "New Zealand",
    image: "newzealand_h.jpg",
    packages: 39,
    price: 118020,
    tag: "diwali",
  },
  {
    name: "UAE - Dubai",
    image: "Dubai.webp",
    packages: 17,
    price: 48110,
    tag: "diwali",
  },
  {
    name: "Singapore",
    image: "Singapore.avif",
    packages: 35,
    price: 50690,
    tag: "diwali",
  },
];

const international = [
  {
    name: "Australia",
    image: "Australia.avif",
    packages: 13,
    price: 84650,
    tag: "monsoon",
  },
  {
    name: "Malasiya",
    image: "malaysia_i.jpg",
    packages: 13,
    price: 50000,
    tag: "monsoon",
  },
  {
    name: "Italy",
    image: "Italy-i.jpg",
    packages: 9,
    price: 228170,
    tag: "diwali",
  },
  {
    name: "Germany",
    image: "germany_i.jpg",
    packages: 14,
    price: 206370,
    priceRange: "From ₹100000 to ₹200000",
    tag: "monsoon",
  },
  {
    name: "Brazil",
    image: "Brazil_i.jpg",
    packages: 39,
    price: 118020,
    tag: "diwali",
  },
  {
    name: "Egypt",
    image: "Egypt_i.jpg",
    packages: 17,
    price: 48110,
    tag: "diwali",
  },
  {
    name: "Greece",
    image: "Greece_i.jpg",
    packages: 35,
    price: 50690,
    tag: "diwali",
  },
];

const indian = [
  {
    name: "Gujarat",
    image: "Gujarat.jpg",
    packages: 13,
    price: 84650,
    tag: "monsoon",
  },
  {
    name: "Madhya Pradesh",
    image: "madhya-pradesh.jpg",
    packages: 13,
    price: 84650,
    tag: "monsoon",
  },
  {
    name: "Lonavala",
    image: "Lonavala.jpg",
    packages: 13,
    price: 84650,
    tag: "monsoon",
  },
  {
    name: "Manali",
    image: "manali.jpg",
    packages: 13,
    price: 50000,
    tag: "winter",
  },
  {
    name: "Rajansthan",
    image: "Rajasthan.jpg",
    packages: 9,
    price: 228170,
    tag: "winter",
  },
  {
    name: "Sikkim",
    image: "Sikkim.jpg",
    packages: 14,
    price: 206370,
    priceRange: "From ₹100000 to ₹200000",
    tag: "winter",
  },
  {
    name: "Ladak",
    image: "ladakh.jpg",
    packages: 39,
    price: 118020,
    tag: "winter",
  },
  {
    name: "Kerela",
    image: "kerela.jpg",
    packages: 17,
    price: 48110,
    tag: "summer",
  },
  {
    name: "Goa",
    image: "Goa.jpg",
    packages: 35,
    price: 50690,
    tag: "summer",
  },
  {
    name: "Andaman&Nicobar",
    image: "Andamn.jpg",
    packages: 35,
    price: 50690,
    tag: "summer",
  },
];


const HomePage = () => {
  const [selectedFilter, setSelectedFilter] = useState("monsoon");
  const [indianFilter, setindianFilter] = useState("monsoon");
  const [honeyFilter, sethoneyFilter] = useState("0-100000");
  const [internationalFilter, setinternationalFilter] = useState("0-100000");

  // Filter destinations by selected tag
  const filteredDestinations = allDestinations.filter(
    (dest) => dest.tag === selectedFilter
  );
  const internationalDestinations = international.filter((dest) => {
    if (!internationalFilter) return true;

    if (internationalFilter.endsWith("+")) {
      const min = parseInt(internationalFilter.replace("+", ""), 10);
      return dest.price >= min;
    }

    const [min, max] = internationalFilter.split("-").map(Number);
    return dest.price >= min && dest.price <= max;
  });

  const honey = honeymoon.filter((dest) => {
    if (!honeyFilter) return true;

    if (honeyFilter.endsWith("+")) {
      const min = parseInt(honeyFilter.replace("+", ""), 10);
      return dest.price >= min;
    }

    const [min, max] = honeyFilter.split("-").map(Number);
    return dest.price >= min && dest.price <= max;
  });

  const indianDestinations = indian.filter(
    (dest) => dest.tag === indianFilter
  );


  return (
    <>
      <Navbar />
      <div className="container px-3 py-4">
  {/* 🔹 Filtered Destination Section */}
  <section className="mb-5">
    <div className="p-4 rounded-4 shadow bg-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fs-3 fw-bold mb-0 text-primary">🌍 Top Trending Travel Destinations</h2>
        <FilterBar onChange={setSelectedFilter} />
      </div>

      <div className="d-flex gap-3 overflow-auto p-2 rounded shadow-sm bg-light" style={{ scrollBehavior: "smooth" }}>
        {filteredDestinations.map((dest, index) => (
          <DestinationCard key={index} {...dest} />
        ))}
      </div>
    </div>
  </section>

  {/* 🔹 International Destinations Section */}
  <section className="mb-5">
    <div className="p-4 rounded-4 shadow bg-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fs-3 fw-bold mb-0 text-success">🌐 International Destinations</h2>
        <PriceFilter onChange={setinternationalFilter} />
      </div>

      <div className="d-flex gap-3 overflow-auto p-2 rounded shadow-sm bg-light" style={{ scrollBehavior: "smooth" }}>
        {internationalDestinations.map((dest, index) => (
          <DestinationCard key={index} {...dest} />
        ))}
      </div>
    </div>
  </section>

  {/* 🔹 Honeymoon Packages Section */}
  <section className="mb-5">
    <div className="p-4 rounded-4 shadow bg-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fs-3 fw-bold mb-0 text-danger">💖 Honeymoon Packages</h2>
        <PriceFilter onChange={sethoneyFilter} />
      </div>

      <div className="d-flex gap-3 overflow-auto p-2 rounded shadow-sm bg-light" style={{ scrollBehavior: "smooth" }}>
        {honey.map((dest, index) => (
          <DestinationCard key={index} {...dest} />
        ))}
      </div>
    </div>
  </section>

  {/* 🔹 Indian Destinations Section */}
  <section className="mb-5">
    <div className="p-4 rounded-4 shadow bg-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fs-3 fw-bold mb-0 text-warning">🇮🇳 Indian Destinations</h2>
        <SeasonFilter onChange={setindianFilter} />
      </div>

      <div className="d-flex gap-3 overflow-auto p-2 rounded shadow-sm bg-light" style={{ scrollBehavior: "smooth" }}>
        {indianDestinations.map((dest, index) => (
          <DestinationCard key={index} {...dest} />
        ))}
      </div>
    </div>
  </section>
</div>

      <Footer />
    </>
  );
};

export default HomePage;