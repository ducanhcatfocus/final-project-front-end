import client from "./client";

export const getUserByEmail = async (targetEmail) => {
  try {
    const { data } = await client.post("/user/account", targetEmail);
    console.log(data);

    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const sendFriendRequest = async (targetEmail) => {
  try {
    const { data } = await client.post("/friend-invitation", targetEmail);
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const friendRequest = async () => {
  try {
    const { data } = await client.get("/friend-invitation");
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const friends = async () => {
  try {
    const { data } = await client.get("/friend-invitation/friends");
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const acceptFriendInvitation = async (id) => {
  try {
    const { data } = await client.post("/friend-invitation/accept", { id });
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const rejectFriendInvitation = async (id) => {
  try {
    const { data } = await client.post("/friend-invitation/reject", { id });
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
