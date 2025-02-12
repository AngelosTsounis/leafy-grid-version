import React, { useState, useEffect } from "react";
import {
  submitRecyclingData,
  getAllRecyclingActivities,
} from "../Utilities/ApiServices";
import "./home.css";
import { calculateRanks } from "../Utilities/RankUnits";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [material, setMaterial] = useState("Plastic");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(null);
  const [mostCommonMaterial, setMostCommonMaterial] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [currentRank, setCurrentRank] = useState({
    name: "Novice",
    icon: "/assets/Novice.png",
  });
  const [nextRank, setNextRank] = useState(null);
  const [progressPercentage, setProgressPercentage] = useState(0);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const validateQuantity = (quantity) => {
    const regex = /^[0-9]*\.?[0-9]+$/;
    return regex.test(quantity);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quantity || !validateQuantity(quantity)) {
      alert("Please enter a valid numeric quantity (e.g., 10 or 20.5).");
      return;
    }

    const token = localStorage.getItem("jwtToken");
    console.log("JWT Token in handleSubmit:", token);
    if (!token) {
      toast.error("Authentication required. Please log in.");
      return;
    }

    setIsLoading(true);
    const data = {
      materialType: material,
      quantity: quantity,
      location: location,
    };

    try {
      const response = await submitRecyclingData(data, token);
      if (response.status === 201) {
        toast.success("Data submitted successfully!");
        setQuantity("");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch recycling summary from the API
  useEffect(() => {
    const fetchTotalPoints = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) return;

      try {
        const response = await fetch(
          "https://localhost:7007/api/recyclingActivity/summary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("API Response:", data); // Log the entire response for debugging

        // Extract the totalPoints correctly
        const totalPoints = data.mostCommonMaterial?.totalPoints || 0; // Access totalPoints from mostCommonMaterial
        console.log("Cumulative Points from Backend:", totalPoints); // Debugging the extracted points

        // Calculate current and next ranks
        const { currentRank, nextRank } = calculateRanks(totalPoints);

        // Update state with new values
        setTotalQuantity(totalPoints); // Use totalPoints here for display
        setMostCommonMaterial(
          data.mostCommonMaterial || { materialType: "Unknown", percentage: 0 }
        );
        setNextRank(nextRank);
      } catch (error) {
        console.error("Error fetching total points:", error);
      }
    };

    fetchTotalPoints();
  }, []); // Fetch once on component mount

  // Fetch recent recycling activities
  useEffect(() => {
    const fetchRecentActivities = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        return;
      }

      try {
        const data = await getAllRecyclingActivities(token); // Pass token to API service

        // Assuming data has the required structure
        if (data && Array.isArray(data.items)) {
          // Set recent activities to the last two items
          const sortedActivities = data.items.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setRecentActivities(sortedActivities.slice(0, 2)); // Get the last two items
        } else {
          console.error("Fetched data does not contain items array:", data);
          setRecentActivities([]);
        }
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    };

    fetchRecentActivities();
  }, []); // Empty dependency array means it runs once after component mounts
  useEffect(() => {
    // Default pointsAwarded to 0 if totalQuantity is null or undefined
    const pointsAwarded = totalQuantity ?? 0; // Safeguard for nullish values
    const { currentRank, nextRank } = calculateRanks(pointsAwarded);

    // Log for debugging
    console.log("Points Awarded:", pointsAwarded);
    console.log("Current Rank:", currentRank);
    console.log("Next Rank:", nextRank);

    // Set state with next rank details
    setCurrentRank(currentRank);
    setNextRank(nextRank);
  }, [totalQuantity]); // Trigger recalculation whenever totalQuantity changes

  useEffect(() => {
    // Calculate progress percentage
    if (nextRank && nextRank.minPoints > 0) {
      const percentage = Math.min(
        (totalQuantity / nextRank.minPoints) * 100,
        100 // Cap percentage at 100%
      );
      setProgressPercentage(percentage);
    } else {
      setProgressPercentage(0); // No progress if no next rank
    }
  }, [totalQuantity, nextRank]); // Recalculate whenever totalQuantity or nextRank changes

  // Other code remains unchanged
  return (
    <>
      {/* ToastContainer to display the toasts */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
      />

      <div className="dashboardmain">
        <div className="card">
          <div className="input-wrapper">
            Did you recycle something new today?
          </div>
          <div className="form-container">
            <div className="input-group">
              <label htmlFor="material">Select Material Type</label>
              <select
                id="material"
                name="material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              >
                <option value="Plastic">Plastic</option>
                <option value="Glass">Glass</option>
                <option value="Paper">Paper</option>
                <option value="Metal">Metal</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="quantity">Enter Quantity</label>
              <textarea
                id="quantity"
                name="quantity"
                rows="2"
                cols="1"
                placeholder="Enter quantity (e.g., 10 kg)"
                value={quantity}
                onChange={handleQuantityChange}
              ></textarea>
            </div>

            <div className="input-group">
              <label htmlFor="location">Enter Location</label>
              <textarea
                id="location"
                name="location"
                rows="2"
                cols="1"
                placeholder="Enter city or country"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="input-content">
            <button
              className="dashboard_btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>

        {/* Display Total Items Recycled and Most Common Material */}
        <div className="card">
          <div className="progress-container">
            <div className="total-items-recycled">
              <h1 className="progress-title">Total Items Recycled</h1>
              <p className="progress-p">
                {totalQuantity !== null ? `${totalQuantity} kg` : "Loading..."}
              </p>
            </div>
            <div className="most-common-product">
              <h1 className="progress-title">Most Common Product</h1>
              {mostCommonMaterial &&
              mostCommonMaterial.materialType !== "Unknown" ? (
                <p className="progress-p">
                  {mostCommonMaterial.percentage.toFixed(2)}%{" "}
                  {mostCommonMaterial.materialType}
                </p>
              ) : (
                <p className="progress-p">Loading...</p>
              )}
            </div>
            <div className="current-reward">
              <h1 className="progress-title">Current Reward</h1>
              <p className="progress-p">{currentRank.reward}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="next-rank-container">
            <div className="next-rank-content-grid">
              <h1>Next Rank</h1>
              {nextRank ? (
                <>
                  <p className="challenger">{nextRank.name}</p>
                  <div className="d-flex gap-3 mt-2 next-rank-requirements">
                    <div>
                      <h1>Requirements:</h1>
                      <p className="mt-2">
                        <img
                          className="next-rank-rupee"
                          src={nextRank.icon}
                          alt="Rupee"
                        />
                        <span className="next-rank-50">
                          {nextRank.minPoints}
                        </span>
                      </p>
                    </div>
                    <div>
                      <h1>Reward:</h1>
                      <p className="mt-2">
                        <span className="next-rank-50">{nextRank.reward}</span>
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="challenger">No next rank available</p>
              )}
            </div>
            <img
              className="next-rank-image"
              src={nextRank ? nextRank.image : "/assets/placeholder.jpg"}
              alt="Next Rank"
            />
          </div>
          <div className="rank-progress">
            <p>Progress to next rank:</p>
            <div className="progress-bar">
              <div
                className="progress-bar-filled"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="recent-recycle-header d-flex align-items-center justify-content-sm-between">
            <h1>Recently Recycled</h1>
          </div>
          <div className="recent-recycle-results d-flex justify-content-sm-around">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <div key={index} className={`item-${index + 1}`}>
                  <h1>
                    {activity.materialType}: {activity.quantity}kg
                  </h1>
                </div>
              ))
            ) : (
              <p>No recent recycling activities available.</p>
            )}
          </div>
        </div>

        <div className="card">
          <div className="rules-section">
            <h3 className="rules-title">🎉 Recycling Rules for Points! ♻️</h3>
            <ul className="rules-list">
              <li>
                <span className="material-name">🪟 Glass:</span>{" "}
                <span className="points">Quantity * 2</span>
              </li>
              <li>
                <span className="material-name">🛍️ Plastic:</span>{" "}
                <span className="points">Quantity * 3</span>
              </li>
              <li>
                <span className="material-name">🔧 Metal:</span>{" "}
                <span className="points">Quantity * 4</span>
              </li>
              <li>
                <span className="material-name">📜 Paper:</span>{" "}
                <span className="points">Quantity * 1</span>
              </li>
            </ul>
            <p className="footer-note">
              🌟 The more you recycle, the more you earn! Let's make the planet
              happy! 🌍
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
