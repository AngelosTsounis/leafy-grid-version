import React, { useEffect, useState } from "react";
import "./calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";
import {
  getAllRecyclingActivities,
  updateRecyclingActivity,
  deleteActivity,
} from "../Utilities/ApiServices";

const Calendar = () => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState("*");
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [updatedActivity, setUpdatedActivity] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const data = await getAllRecyclingActivities();

      if (data && Array.isArray(data.items)) {
        setActivities(data.items);
      } else {
        console.error("Fetched data does not contain items array:", data);
        setActivities([]);
      }
    } catch (error) {
      console.error("Failed to fetch activities:", error);
      setActivities([]);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleModalShow = (activity) => {
    setSelectedActivity(activity);
    setUpdatedActivity(activity);
    setShowModal(true);
    setErrors({});
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedActivity(null);
  };

  const validateField = (field, value) => {
    let errorMessage = "";
    if (field === "materialType") {
      if (!value) {
        errorMessage = "MaterialType is required.";
      } else if (!["Glass", "Paper", "Plastic", "Metal"].includes(value)) {
        errorMessage =
          "MaterialType must be one of the following: Glass, Paper, Plastic, or Metal.";
      }
    }
    if (field === "quantity") {
      if (!value || isNaN(value) || value <= 0) {
        errorMessage = "Quantity must be a positive number.";
      }
    }
    if (field === "location") {
      if (!value) {
        errorMessage = "Location is required.";
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        errorMessage = "Location must contain only letters and spaces.";
      }
    }
    return errorMessage;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUpdatedActivity({ ...updatedActivity, [id]: value });

    const errorMessage = validateField(id, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: errorMessage,
    }));
  };

  const handleSaveChanges = async () => {
    let validationErrors = {};

    Object.keys(updatedActivity).forEach((field) => {
      const error = validateField(field, updatedActivity[field]);
      if (error) validationErrors[field] = error;
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!updatedActivity || !updatedActivity.id) return;

    try {
      await updateRecyclingActivity(updatedActivity.id, updatedActivity);

      setActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity.id === updatedActivity.id ? updatedActivity : activity
        )
      );
      handleModalClose();
      window.location.reload();
    } catch (error) {
      console.error("Failed to update activity:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      const success = await deleteActivity(id);
      if (success) {
        toast.success("Activity deleted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Failed to delete the activity. Please try again.");
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
      .replace(",", "");
  };

  const getMaterialColor = (materialType) => {
    switch (materialType.toLowerCase()) {
      case "plastic":
        return "#f0ad4e";
      case "glass":
        return "#5bc0de";
      case "metal":
        return "#d9534f";
      case "paper":
        return "#5cb85c";
      default:
        return "gold";
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
      />

      <div className="categoriesmain">
        <h2 className="calendarTitle">Track your recycling history</h2>
        {/* Filter Box */}
        <div className="filters_and_items">
          <ul className="portfolio_filters" id="portfolioFilters">
            <li
              data-filter="*"
              className={filter === "*" ? "filter-active" : ""}
              onClick={() => handleFilterChange("*")}
            >
              All
            </li>
            <li
              data-filter=".filter-glass"
              className={filter === ".filter-glass" ? "filter-active" : ""}
              onClick={() => handleFilterChange(".filter-glass")}
            >
              Glass
            </li>
            <li
              data-filter=".filter-plastic"
              className={filter === ".filter-plastic" ? "filter-active" : ""}
              onClick={() => handleFilterChange(".filter-plastic")}
            >
              Plastic
            </li>
            <li
              data-filter=".filter-paper"
              className={filter === ".filter-paper" ? "filter-active" : ""}
              onClick={() => handleFilterChange(".filter-paper")}
            >
              Paper
            </li>
            <li
              data-filter=".filter-metal"
              className={filter === ".filter-metal" ? "filter-active" : ""}
              onClick={() => handleFilterChange(".filter-metal")}
            >
              Metal
            </li>
          </ul>
        </div>

        {/* Grid of Boxes */}
        <div className="box-container">
          {activities
            .filter(
              (activity) =>
                filter === "*" ||
                (filter === ".filter-glass" &&
                  activity.materialType.toLowerCase() === "glass") ||
                (filter === ".filter-plastic" &&
                  activity.materialType.toLowerCase() === "plastic") ||
                (filter === ".filter-paper" &&
                  activity.materialType.toLowerCase() === "paper") ||
                (filter === ".filter-metal" &&
                  activity.materialType.toLowerCase() === "metal")
            )
            .map((activity) => (
              <div key={activity.id} className={`box filter-app`}>
                <div className="box-content">
                  <h3 className="fw-500 fs-4">{activity.location}</h3>
                  <p>
                    Great job! You recycled a total quantity of
                    <strong> {activity.quantity} kg</strong>
                  </p>
                  <p className="date">{formatDate(activity.date)}</p>{" "}
                  <div className="update-delete-box d-flex">
                    <p
                      className="material"
                      style={{
                        backgroundColor: getMaterialColor(
                          activity.materialType
                        ),
                      }}
                    >
                      {activity.materialType}
                    </p>
                    <span>
                      <i
                        className="icon-edit bi bi-pencil-square mx-2"
                        onClick={() => handleModalShow(activity)}
                      ></i>{" "}
                      {/* Edit icon */}
                      <i
                        className="bi bi-trash"
                        onClick={() => handleDelete(activity.id)}
                      ></i>{" "}
                      {/* Delete icon */}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedActivity && (
            <form>
              <div className="mb-3">
                <label htmlFor="materialType" className="form-label">
                  Material Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="materialType"
                  value={updatedActivity.materialType || ""}
                  onChange={handleInputChange}
                />
                {errors.materialType && (
                  <div className="text-danger">{errors.materialType}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity Recycled
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="quantity"
                  value={updatedActivity.quantity || ""}
                  onChange={handleInputChange}
                />
                {errors.quantity && (
                  <div className="text-danger">{errors.quantity}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  value={updatedActivity.location || ""}
                  onChange={handleInputChange}
                />
                {errors.location && (
                  <div className="text-danger">{errors.location}</div>
                )}
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Calendar;
