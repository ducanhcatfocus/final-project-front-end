import client from "./client";

export const getAllNotifications = async (userId) => {
  try {
    const { data } = await client.get(`/notification/getAllNotifications`);
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
