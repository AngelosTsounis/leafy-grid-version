import React, { useEffect, useState } from "react";
import "./calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";

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

  // Fetch activities on mount
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
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedActivity(null);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUpdatedActivity({ ...updatedActivity, [id]: value });
  };

  const handleSaveChanges = async () => {
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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
      .replace(",", ""); // Remove comma if necessary
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      const success = await deleteActivity(id); // Call your delete API function
      if (success) {
        alert("Activity deleted successfully!");
        window.location.reload();
        // Optionally, refresh activities or remove the deleted one from the list
        setRecentActivities((prevActivities) =>
          prevActivities.filter((activity) => activity.id !== id)
        );
      } else {
        alert("Failed to delete the activity. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="categoriesmain">
        <div className="box">
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
        </div>

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
                  <p className="material">{activity.materialType}</p>
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
                {/* Display formatted date */}
              </div>
            </div>
          ))}
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
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={updatedActivity.date?.split("T")[0] || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pointsEarned" className="form-label">
                  Points Earned
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="pointsEarned"
                  value={updatedActivity.pointsEarned || 0}
                  onChange={handleInputChange}
                />
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
