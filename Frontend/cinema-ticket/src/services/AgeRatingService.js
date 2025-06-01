import httpAxios from "./httpAxios";

const AgeRatingService = {
  index: async () => {
    return await httpAxios.get(`age-ratings`);
  },

  trash: async () => {
    return await httpAxios.get(`age-ratings/trash`);
  },

  show: async (id) => {
    return await httpAxios.get(`age-ratings/${id}`);
  },

  insert: async (data) => {
    return await httpAxios.post(`age-ratings`, data);
  },

  update: async (data, id) => {
    return await httpAxios.put(`age-ratings/${id}`, data);
  },

  status: async (id) => {
    return await httpAxios.get(`age-ratings/status/${id}`);
  },

  delete: async (id) => {
    return await httpAxios.get(`age-ratings/delete/${id}`);
  },

  restore: async (id) => {
    return await httpAxios.get(`age-ratings/restore/${id}`);
  },

  destroy: async (id) => {
    return await httpAxios.delete(`age-ratings/destroy/${id}`);
  },

  add: async (ageRating) => {
    console.log('Data to be sent:', ageRating);
    const response = await httpAxios.post('age-ratings', ageRating);
    console.log('Response from API:', response);
    return response.data;
  }
};

export default AgeRatingService;
