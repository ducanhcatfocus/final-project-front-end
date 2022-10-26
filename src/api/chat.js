import client from "./client";

export const getChat = async (userId, page) => {
  try {
    const { data } = await client.get(
      `conversation/chat/${userId}?page=${page}`
    );
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const getAllConversations = async () => {
  try {
    const { data } = await client.get(`conversation/getAllConversations`);
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
