import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
const AboutUs = () => {
    return (
        <>
        <Navbar/>
        <div className="about-us" style={{ fontFamily: "'Segoe UI', sans-serif", color: "#333" }}>
  {/* 🔹 Banner Image */}
  <div className="w-100 overflow-hidden" style={{ height: "400px" }}>
    <img
      src="Europe.avif"
      alt="About Us Banner"
      className="w-100 h-100 object-fit-cover border-bottom border-5 border-info"
    />
  </div>

  {/* 🔹 Who We Are */}
  <section className="py-5 container">
    <h2 className="text-center text-info fw-bold mb-4">Who We Are</h2>
    <p className="fs-5 text-center" style={{ lineHeight: "1.8" }}>
      Wanderlust Travels is a leading travel and tourism company committed to creating unforgettable memories.
      We specialize in personalized travel experiences, from weekend getaways to luxurious international tours.
      Our goal is to make travel planning effortless and enjoyable for all our customers.
    </p>
  </section>

  {/* 🔹 What We Do */}
  <section className="py-5 bg-light">
    <div className="container">
      <h2 className="text-center text-info fw-bold mb-4">What We Do</h2>
      <p className="fs-5 text-center text-secondary" style={{ lineHeight: "1.8" }}>
        We specialize in crafting unforgettable domestic and international travel experiences.
        From seamless hotel and resort bookings to reliable local and outstation transportation,
        we ensure every journey is smooth. Our services also include visa assistance, travel insurance,
        and personalized holiday packages tailored to your preferences. With 24/7 support,
        we’re always just a call away throughout your trip.
      </p>
    </div>
  </section>

  {/* 🔹 Statistics */}
  <section className="py-5 text-center">
    <h2 className="text-info fw-bold mb-5">Our Reach So Far</h2>
    <div className="container d-flex justify-content-around flex-wrap gap-4">
      {[
        { label: "Happy Customers", value: "10,000+" },
        { label: "Countries Served", value: "15+" },
        { label: "Years in Business", value: "5+" },
        { label: "Expert Team Members", value: "30+" }
      ].map((stat, index) => (
        <div key={index}>
          <h3 className="display-5 text-success fw-bold">{stat.value}</h3>
          <p className="fs-5">{stat.label}</p>
        </div>
      ))}
    </div>
  </section>

  {/* 🔹 Meet Our Experts */}
  <section className="bg-light py-5">
    <div className="container">
      <h2 className="text-center text-info fw-bold mb-5">Meet Our Experts</h2>
      <div className="row justify-content-center g-4">
        {[
          { name: "Manav Patel", role: "CEO & Founder", img: "Greece_i.jpg" },
          { name: "Priya Mehta", role: "Travel Manager", img: "Gujarat.jpg" },
          { name: "Ravi Sharma", role: "Tour Coordinator", img: "Italy-i.jpg" }
        ].map((member, index) => (
          <div className="col-md-3 col-sm-6 text-center" key={index}>
            <img
              src={member.img}
              alt={member.name}
              className="rounded-circle mb-3"
              style={{ width: "140px", height: "140px", objectFit: "cover" }}
            />
            <h5 className="fw-bold">{member.name}</h5>
            <p className="text-muted">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* 🔹 Call to Action */}
  <section className="bg-info py-5 text-white text-center">
    <h2 className="fw-bold">Ready to Explore the World with Us?</h2>
    <p className="fs-5 mb-4">Discover your next adventure today!</p>
    <button
      className="btn btn-light btn-lg px-4 fw-semibold"
      onClick={() => window.location.href = "/Home"}
    >
      Explore Destinations
    </button>
  </section>
</div>

        <Footer/>
        </>
    );
};

export default AboutUs;
