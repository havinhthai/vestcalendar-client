import axiosClient from 'utils/axios';

const endPoint = '/auth';

export default {
  async loginByGoogle(accessToken) {
    const path = `${endPoint}/login/google`;

    const response = await axiosClient.post(path, {
      accessToken,
    });

    axiosClient.defaults.headers.Authorization = `Bearer ${response.data.payload.token}`;

    return response.data;
  },

  async loginByTelegram(userInfo) {
    const path = `${endPoint}/login/telegram`;

    const response = await axiosClient.post(path, {
      ...userInfo,
    });

    axiosClient.defaults.headers.Authorization = `Bearer ${response.data.payload.token}`;

    return response.data;
  },

  async loginByTwitter({ code, codeVerifier }) {
    const path = `${endPoint}/login/twitter`;

    const response = await axiosClient.post(path, {
      code,
      codeVerifier,
    });

    axiosClient.defaults.headers.Authorization = `Bearer ${response.data.payload.token}`;

    return response.data;
  },

  async twitterRequestAuthLink() {
    const path = `${endPoint}/login/twitter/request-auth-link`;

    const response = await axiosClient.get(path);

    return response.data;
  },

  async getMe(token) {
    const path = '/me';

    axiosClient.defaults.headers.Authorization = `Bearer ${token}`;

    const response = await axiosClient.get(path);

    return response.data;
  },
};
