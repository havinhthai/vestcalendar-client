import axiosClient from 'utils/axios';

const endPoint = '/projects';

export default {
  async getProjects(params) {
    const path = endPoint;

    const response = await axiosClient.get(path, {
      params,
    });

    return response.data;
  },
  async getWatchListProjects(params) {
    const path = `${endPoint}/watch`;

    const response = await axiosClient.get(path, {
      params,
    });

    return response.data;
  },
  async getProjectsPrice(ids) {
    const response = await axiosClient.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids,
        vs_currencies: 'usd',
        include_24hr_change: true,
      },
    });

    return response.data;
  },

  async getProject(payload) {
    const path = `${endPoint}/${payload}`;

    const response = await axiosClient.get(path);

    return response.data;
  },

  async addProjectToWatchList(payload) {
    const path = `${endPoint}/${payload.id}/watch`;

    const response = await axiosClient.post(path);

    return response.data;
  },

  async removeProjectFromWatchList(payload) {
    const path = `${endPoint}/${payload.id}/watch`;

    const response = await axiosClient.delete(path);

    return response.data;
  },
};
