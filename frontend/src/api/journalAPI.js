import API from "./api"; // existing axios instance

const JournalAPI = {
  // Get all journal entries for a user
  getAll: async (userId) => {
    try {
      const response = await API.get(`/journals?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get a single journal entry by ID for a user
  getById: async (userId, id) => {
    try {
      const response = await API.get(`/journals/${id}?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create a new journal entry
  create: async (userId, entryData) => {
    try {
      const response = await API.post(`/journals?userId=${userId}`, entryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update an existing journal entry
  update: async (userId, id, entryData) => {
    try {
      const response = await API.put(`/journals/${id}?userId=${userId}`, entryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete a journal entry
  delete: async (userId, id) => {
    try {
      const response = await API.delete(`/journals/${id}?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default JournalAPI;
