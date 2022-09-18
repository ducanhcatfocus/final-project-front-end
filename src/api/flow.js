import client from "./client";

export const createFlow = async (flow) => {
  try {
    console.log(flow);
    const { data } = await client.post("/flow/create-flow", flow, {
      headers: {
        "Content-Type": "application/json",
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

export const getAllFlow = async () => {
  try {
    const { data } = await client.get("/flow/all-flow");
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
