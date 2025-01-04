import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { profileUpdateSchema } from "../components/Validators/profileUpdateSchema"; // Import the schema
import { calculateRanks } from "../components/Dashboard/Utilities/RankUnits";
import DashboardHome from "../components/Dashboard/Home/home";
import Calendar from "../components/Dashboard/Calendar/calendar";
import SidebarData from "../components/Dashboard/Utilities/SidebarData";
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import {
  getAllRecyclingActivities,
  updateProfile,
} from "../components/Dashboard/Utilities/ApiServices";

import "../components/Dashboard/Utilities/Sidebar.css";
import logo from "/public/assets/logo.png";

const Dashboard = () => {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    newPassword: "",
  });
  const [sidebar, setSidebar] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(0);
  const [currentRank, setCurrentRank] = useState({
    name: "Novice",
    icon: "/assets/Novice.png",
  });
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) throw new Error("No token found.");

        const response = await fetch("https://localhost:7007/api/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok)
          throw new Error(`Failed to fetch profile: ${response.status}`);
        const userData = await response.json();
        setProfile(userData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProfile();
  }, []);

  // Fetch user recycling activities and calculate total points
  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const data = await getAllRecyclingActivities(); // Or your endpoint for user activities
        if (data && Array.isArray(data.items)) {
          setPointsAwarded(
            data.items.reduce(
              (sum, activity) => sum + activity.pointsAwarded,
              0
            )
          );
        }
      } catch (error) {
        console.error("Failed to fetch user points:", error);
      }
    };

    fetchUserPoints();
  }, []);

  // Input handler
  const handleInputChange = async ({ target: { name, value } }) => {
    setProfile((prev) => ({ ...prev, [name]: value }));

    try {
      // Dynamically validate the single field
      await profileUpdateSchema.validateAt(name, { [name]: value });
      setError((prev) => ({ ...prev, [name]: "" })); // Clear error
    } catch (err) {
      setError((prev) => ({ ...prev, [name]: err.message })); // Set error
    }
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      // Validate the form using Yup
      await profileUpdateSchema.validate(profile, { abortEarly: false });

      const { username, password, newPassword, id } = profile;

      if (!id || !username.trim()) {
        toast.error("Username cannot be empty.");
        return;
      }

      // Call the updateProfile API function
      await updateProfile(id, {
        username: username.trim(),
        passwordHash: newPassword?.trim() || password?.trim() || "",
      });

      toast.success("Profile updated successfully.");
      setShowModal(false);
    } catch (validationError) {
      if (validationError.name === "ValidationError") {
        const newError = {};
        validationError.inner.forEach((err) => {
          newError[err.path] = err.message;
        });
        setError(newError);
      } else {
        console.error("Failed to update profile:", validationError);
        toast.error("Failed to update profile.");
      }
    }
  };

  // Toggle sidebar
  const toggleSidebar = () => setSidebar((prev) => !prev);

  // Modal handlers
  const handleMenuItemClick = (index) => {
    SidebarData[index].title === "My Profile"
      ? setShowModal(true)
      : setActiveItem(index);
  };

  const handleClose = () => setShowModal(false);

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  useEffect(() => {
    const { currentRank } = calculateRanks(pointsAwarded);
    setCurrentRank(currentRank);
  }, [pointsAwarded]);

  return (
    <div className="body">
      <IconContext.Provider value={{ color: "orange" }}>
        <div className="navbar">
          <img src={logo} className="dashboard_logo" alt="Logo" />
          <div className="navbar-greeting">
            <h1 className="greeting">Hello, {profile.username}</h1>
            <p className="greeting2">Today is {formatDate(new Date())}</p>
          </div>
        </div>
        <div className={`nav-menu ${sidebar ? "active" : ""}`}>
          <div className="pointsEarned">
            <img className="rankingImg" src={currentRank.icon} alt="Rupee" />
            <span className="points-number" id="currentPoints">
              {pointsAwarded ?? 0}
            </span>
          </div>
          <div className="current-rank-wrapper">
            <span className="current-rank-text">Current Rank</span>
            <span className="rank-text" id="currentRank">
              {currentRank.name}
            </span>
          </div>
          <ul className="nav-menu-items">
            <img className="user_img" src={currentRank.image} alt="User" />
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
      </Routes>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["username", "newPassword"].map((field) => (
              <Form.Group key={field} controlId={`form${field}`}>
                <Form.Label>
                  {field === "newPassword"
                    ? "New Password"
                    : field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                  {/* Capitalize */}
                </Form.Label>
                <Form.Control
                  type={field.includes("password") ? "password" : "text"}
                  name={field}
                  value={profile[field]}
                  onChange={handleInputChange}
                  isInvalid={error[field]}
                />
                <Form.Control.Feedback type="invalid">
                  {error[field]}
                </Form.Control.Feedback>
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
