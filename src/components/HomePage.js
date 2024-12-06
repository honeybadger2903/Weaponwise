import React, { useState, useEffect } from "react";

import './HomePage.css';

const HomePage = () => {


  const slideImages = [
    "/images/impact_Image4.jpg",
    "/images/image1.jpeg",

    "/images/image2.jpeg",
    "/images/image3.jpeg",
    "/images/image4.jpg"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(slideImages.length - 1);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isIssueEquipmentsDropdownOpen, setIsIssueEquipmentsDropdownOpen] = useState(false);
  const [isReturnEquipmentsDropdownOpen, setIsReturnEquipmentsDropdownOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevSlide(currentSlide); // Set previous slide before updating current slide
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideImages.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [currentSlide, slideImages.length]);



  //  const handleDropdownToggle = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };


  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo">
          <img src="\images\logo2.jpg"
                alt="WeaponWise">

                </img>

        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#about">Contact Us</a>
          <a href="/issued-items"> History </a>


        </div>
      </nav>

      {/* Slideshow */}
      <div className="slideshow">
        {slideImages.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''} ${index === prevSlide ? 'prev' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </div>

      {/* Current Slide Indicator
      <div className="current-slide">
        <p>Current Slide: {currentSlide + 1} of {slideImages.length}</p>
      </div> */}

      {/* Notification Bar */}
      <div className="notification-bar">
        ⚠️ Alerts: Equipment return deadline is approaching. Please check your inventory.
      </div>

      {/* Action Buttons */}
      <div className="button-section">
  <div className="dropdown">
    <button
      className="dropbtn"
      onMouseEnter={() => setIsIssueEquipmentsDropdownOpen(true)}
      onMouseLeave={() => setIsIssueEquipmentsDropdownOpen(false)}
    >
      Issue Equipments
    </button>
    <div className={`dropdown-content ${isIssueEquipmentsDropdownOpen ? "active" : ""}`}>
      <a href="/day-form">Day-To-Day</a>
      <a href="/clean-form">Clean</a>
    </div>
  </div>

  <div className="dropdown">
    <button
      className="dropbtn"
      onMouseEnter={() => setIsReturnEquipmentsDropdownOpen(true)}
      onMouseLeave={() => setIsReturnEquipmentsDropdownOpen(false)}
    >
      Return Equipment
    </button>
    <div className={`dropdown-content ${isReturnEquipmentsDropdownOpen ? "active" : ""}`}>
      <a href="/return-table">Day-To-Day</a>
      <a href="/clean-form">Clean</a>
    </div>
  </div>

  <button className="action-button">
    <a href="/check-inventory" style={{textDecoration:'none', color:"white"}}>
      Check Inventory
    </a>
  </button>
  <button className="action-button">Duty List</button>
</div>




      {/* Information Boxes */}
      <div className="info-boxes">
        <div className="info-box">
          <h3>Total Equipments Issued</h3>
          <p>50</p>
        </div>
        <div className="info-box">
          <h3>Pending Returns for Today</h3>
          <p>0</p>
        </div>
        <div className="info-box">
          <h3>Additional Information</h3>
          <p>Other relevant info here.</p>
        </div>
      </div>

      {/* About Us Section */}
      <div className="about-us" id="about">
        <h2>About Us</h2>
        <p>
        This  is a product of team BugHunter.
         We made this website to make the management of KOTE better,
         efficient and a modern way to track the equipments.
         This website makes the work of our army personnel effortless by eliminating the
         use of conventional registers to store the entries, which were hard to maintain,
         store and difficult to find a specific entry in them. There is an in-built alert system
         in our website which automatically alerts the admin when the equipment is not returned
         within a specific time frame, which has to be tracked manually in traditional KOTEs.
         We made this system keeping in mind all the protocols followed by the Indian Army,
         and in addition we have incorporated new security measures to ensure the safety of the management of KOTE.
        </p>
      </div>

      {/* Footer */}
      <footer className="footer">

       <p> © 2024 WeaponWise. All rights reserved       </p>
       <p>
          Contact us:
          <a href="mailto:tushartutejatwo9@gmail.com">  tushartutejatwo9@gmail.com</a> |
          <a href="mailto:vishu.chauhan.cse.2022@miet.ac.in">  vishu.chauhan.cse.2022@miet.ac.in</a>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
