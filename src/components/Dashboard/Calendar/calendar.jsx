import React, { useEffect, useState } from "react";
import "./calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import {
  getAllRecyclingActivities,
  updateRecyclingActivity,
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
              <div
                className="box-content"
                onClick={() => handleModalShow(activity)}
              >
                <p>Material Type: {activity.materialType}</p>
                <p>Quantity Recycled: {activity.quantity}</p>
                <p>Date: {formatDate(activity.date)}</p>{" "}
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
