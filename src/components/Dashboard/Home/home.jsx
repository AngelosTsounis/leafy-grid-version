import React, { useState } from "react";
import { submitRecyclingData } from "../Utilities/ApiServices";
import "./home.css";

const Home = () => {
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const data = {
      materialType: material,
      quantity: quantity,
    };

    try {
      const response = await submitRecyclingData(data);
      if (response.status === 201) {
        console.log("Success:", response.data);
        alert("Data submitted successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error submitting data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
                placeholder="10 kg, 20kg etc."
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="input-content">
            <button
              className="dashboard_btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}{" "}
              {/* Button text changes */}
            </button>
          </div>

          {/* Show error message if present */}
          {error && <p className="error-message">{error}</p>}
        </div>

        {/* The rest of your components */}
        <div className="card">
          <div className="progress-container">
            <div className="total-items-recycled">
              <h1 className="progress-title">Total Items Recycled</h1>
              <p className="progress-p">88kg</p>
            </div>
            <div className="most-common-product">
              <h1 className="progress-title">Most common product</h1>
              <p className="progress-p">55% Glass</p>
            </div>
            <div className="current-reward">
              <h1 className="progress-title">Current reward</h1>
              <p className="progress-p">Bonsai Tree</p>
            </div>
          </div>
        </div>

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
