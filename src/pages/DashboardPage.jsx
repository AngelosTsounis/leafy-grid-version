import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import DashboardHome from "../components/Dashboard/Home/home";
import Calendar from "../components/Dashboard/Calendar/calendar";
import SidebarData from "../components/Dashboard/Utilities/SidebarData";
import "../components/Dashboard/Utilities/Sidebar.css";
import { IconContext } from "react-icons";
import logo from "/public/assets/logo.png";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Dashboard = () => {
  const [sidebar, setSidebar] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState({
    username: "Angel",
    email: "angel@example.com",
    location: "New York",
    password: "",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 86400000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const toggleSidebar = () => setSidebar(!sidebar);

  const handleMenuItemClick = (index) => {
    // If "My Profile" is clicked, open the modal
    if (SidebarData[index].title === "My Profile") {
      setShowModal(true); // Open the modal for profile
    } else {
      setActiveItem(index);
    }
  };

  // Handlers for modal visibility
  const handleClose = () => setShowModal(false);

  // Handlers for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="body">
      <IconContext.Provider value={{ color: "orange" }}>
        <div className="navbar">
          <img src={logo} className="dashboard_logo" alt="Logo" />
          <div className="navbar-greeting">
            <h1 className="greeting">Hello, {profile.username}</h1>
            <p className="greeting2">Today is {formatDate(currentDate)}</p>
          </div>
        </div>
        <div className={sidebar ? "nav-menu active" : "nav-menu"}>
          <div className="pointsEarned">
            <img
              className="rankingImg"
              src="/assets/RedRupee.png"
              alt="Rupee"
            />
            <span className="points-number" id="currentPoints">
              45
            </span>
          </div>
          <div className="current-rank-wrapper">
            <span className="current-rank-text">Current Rank</span>
            <span className="rank-text" id="currentRank">
              Grandmaster
            </span>
          </div>
          <ul className="nav-menu-items">
            <img className="user_img" src="/assets/Tarnished.png" alt="User" />
            {SidebarData.map((item, index) => (
              <li
                key={index}
                className={`nav-text ${activeItem === index ? "active" : ""}`}
              >
                <Link
                  to={item.path || "#"}
                  onClick={() => handleMenuItemClick(index)}
                >
                  {item.icon}
                  <span className="item_title">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to="#" className="menu-bars" onClick={toggleSidebar}>
          <FaIcons.FaBars />
        </Link>
      </IconContext.Provider>

      <Routes>
        <Route path="home" element={<DashboardHome />} />
        <Route path="calendar" element={<Calendar />} />
        {/* Add more routes as necessary */}
      </Routes>

      {/* Modal for Profile */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
                className="input-custom"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="input-custom"
              />
            </Form.Group>

            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={profile.location}
                onChange={handleInputChange}
                className="input-custom"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={profile.password}
                onChange={handleInputChange}
                className="input-custom"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="btn-secondary-custom"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleClose}
            className="btn-primary-custom"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
