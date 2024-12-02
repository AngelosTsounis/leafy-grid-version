import axios from "axios";

// Base API URL
const API_URL = "https://localhost:7007/api";

// Helper function to get the JWT token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Function to submit recycling data
export const submitRecyclingData = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/recyclingActivity`,
      data,
      { headers: getAuthHeaders() } // Include auth headers
    );
    return response;
  } catch (error) {
    console.error("Error in submitRecyclingData:", error);
    throw error;
  }
};

// Function to fetch all recycling activities
export const getAllRecyclingActivities = async () => {
  try {
    const response = await axios.get(`${API_URL}/recyclingActivity`, {
      headers: getAuthHeaders(), // Include auth headers
    });
    return response.data;
  } catch (error) {
    console.error("Error in getAllRecyclingActivities:", error);
    throw error;
  }
};

// Function to update recycling activity
export const updateRecyclingActivity = async (id, data) => {
  try {
    const response = await axios.put(
      `${API_URL}/recyclingActivity/${id}`,
      data,
      { headers: getAuthHeaders() } // Include auth headers
    );
    return response;
  } catch (error) {
    console.error("Error in updating the recycling activity", error);
    throw error;
  }
};

// Function to fetch the totalQuantity and mostCommonMaterial used
export const getRecyclingSummary = async () => {
  try {
    const response = await axios.get(`${API_URL}/recyclingActivity/summary`, {
      headers: getAuthHeaders(), // Include auth headers
    });
    return response.data; // Return the summary data
  } catch (error) {
    console.error("Error in getRecyclingSummary:", error);
    throw error;
  }
};

// Create a function for updating user profile
export const updateProfile = async (id, data) => {
  try {
    const response = await axios.put(
      `${API_URL}/auth/${id}`, // Use the correct API endpoint for updating user
      data,
      { headers: getAuthHeaders() } // Ensure auth headers are set
    );
    return response;
  } catch (error) {
    console.error("Error in updating profile:", error);
    throw error; // Rethrow to handle it in the calling function
  }
};

export const deleteActivity = async (id) => {
  try {
    const token = localStorage.getItem("jwtToken"); // Retrieve JWT token
    const response = await fetch(
      `https://localhost:7007/api/recyclingActivity/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authorization
        },
      }
    );

    if (response.ok) {
      console.log(`Activity with ID ${id} deleted successfully.`);
      return true; // Return success
    } else {
      const errorMessage = await response.text();
      console.error(`Failed to delete activity: ${errorMessage}`);
      return false; // Return failure
    }
  } catch (error) {
    console.error("Error deleting activity:", error);
    return false; // Return failure
  }
};
