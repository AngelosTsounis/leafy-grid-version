import axios from "axios";

// Function to submit recycling data
export const submitRecyclingData = async (data) => {
  try {
    const response = await axios.post(
      "https://localhost:7007/api/recyclingActivity/create",
      data
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
    const response = await axios.get(
      "https://localhost:7007/api/recyclingActivity/getAll"
    );
    return response.data;
  } catch (error) {
    console.error("Error in getAllRecyclingActivities:", error);
    throw error;
  }
};

//Function to update recycling activity
export const updateRecyclingActivity = async (id, data) => {
  try {
    const response = await axios.put(
      `https://localhost:7007/api/recyclingActivity/update/${id}`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error in updating the recycling activity", error);
    throw error;
  }
};
