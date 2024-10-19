import React, { useState, useEffect } from "react";
import { submitRecyclingData } from "../Utilities/ApiServices";
import "./home.css";

const Home = () => {
  const [material, setMaterial] = useState("Plastic");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // State for total quantity and most common material
  const [totalQuantity, setTotalQuantity] = useState(null); // Initially null
  const [mostCommonMaterial, setMostCommonMaterial] = useState(null); // Initially null

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

    setIsLoading(true);
    const data = {
      materialType: material,
      quantity: quantity,
    };

    try {
      const response = await submitRecyclingData(data);
      if (response.status === 201) {
        console.log("Success:", response.data);
        alert("Data submitted successfully!");
        setQuantity(""); // Clear input field after success

        // Reload the page to fetch updated data
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch recycling summary (total items recycled, most common product) from the API
  useEffect(() => {
    const fetchRecyclingSummary = async () => {
      try {
        const response = await fetch(
          "https://localhost:7007/api/recyclingActivity/summary"
        );
        const data = await response.json();

        console.log("API Response:", data); // Debugging: Check the structure of the response

        // Ensure that the data contains valid values and set state accordingly
        setTotalQuantity(data.totalQuantity || 0); // Using 'totalQuantity' as per API response
        setMostCommonMaterial(
          data.mostCommonMaterial || { materialType: "Unknown", percentage: 0 }
        ); // Using 'materialType'
      } catch (error) {
        console.error("Error fetching recycling summary:", error);
      }
    };

    fetchRecyclingSummary();
  }, []); // Empty dependency array means it runs once after component mounts

  return (
    <>
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
              {/* Add fallback to display "Loading..." until the API response is received */}
              <p className="progress-p">
                {totalQuantity !== null ? `${totalQuantity} kg` : "Loading..."}
              </p>
            </div>
            <div className="most-common-product">
              <h1 className="progress-title">Most common product</h1>
              {/* Add fallback to display "Loading..." until mostCommonMaterial is available */}
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
              <h1 className="progress-title">Current reward</h1>
              <p className="progress-p">Bonsai Tree</p>{" "}
              {/* This seems static for now */}
            </div>
          </div>
        </div>

        {/* Other parts of the dashboard, unchanged */}
        <div className="card">
          <div className="next-rank-container">
            <div className="next-rank-content-grid">
              <h1>Next Rank</h1>
              <p className="challenger">Challenger</p>
              <div className="d-flex gap-3 mt-2 next-rank-requirements">
                <div>
                  <h1 className="">Requirements:</h1>
                  <p className="mt-2">
                    <img
                      className="next-rank-rupee"
                      src="/assets/PurpleRupee.png"
                      alt="Rupee"
                    />
                    <span className="next-rank-50">50</span>
                  </p>
                </div>
                <div>
                  <h1>Reward:</h1>
                  <p className="mt-2">
                    <span className="next-rank-50">Deku Tree</span>
                  </p>
                </div>
              </div>
            </div>
            <img
              className="next-rank-image"
              src="/assets/helmarocking.jpg"
              alt="Helmarocking"
            />
          </div>
        </div>

        <div className="card">
          <div className="recent-recycle-header d-flex align-items-center justify-content-sm-between">
            <h1>Recently Recycled</h1> <a href="#">View More</a>
          </div>
          <div className="recent-recycle-results d-flex justify-content-sm-around">
            <div className="item-1">
              <h1>Glass: 50kg</h1>
            </div>
            <div className="item-2">
              <h1>Paper: 300kg</h1>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="quote-section">
            <h3>
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae
              maiores vel repellendus rem odio, ratione, ea asperiores dolor
              ipsum doloribus nesciunt! Officia numquam non aliquid doloremque
              corporis adipisci sequi dolores!"
            </h3>
            <p>Angel Tsounis</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
