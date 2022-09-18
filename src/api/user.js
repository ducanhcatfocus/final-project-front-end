import client from "./client";

export const getProfile = async (userId) => {
  try {
    const { data } = await client.get(`/user/userProfile/${userId}`);
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const updateProfile = async (info) => {
  try {
    console.log(info);
    const { data } = await client.put("/user/updateProfile", info, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
