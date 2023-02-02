import client from "./client";

export const sendDocument = async (document) => {
  try {
    document.receiver = JSON.stringify(document.receiver);
    const { data } = await client.post(`/document/send-document`, document, {
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

export const receivedDocument = async (email) => {
  try {
    const { data } = await client.get(
      `/document/received-document?email=${email}`
    );
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const myDocument = async () => {
  try {
    const { data } = await client.get(`/document/my-document`);
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const searchMyDocument = async (value) => {
  try {
    const { data } = await client.get(
      `/document/search-my-document?search=${value}`
    );
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const deleteMyDocument = async (documentId) => {
  try {
    const { data } = await client.put(
      `/document/document-detail/${documentId}`
    );
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const getDocument = async (documentId) => {
  try {
    const { data } = await client.get(
      `/document/document-detail/${documentId}`
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const getReceivedDocument = async (documentId) => {
  try {
    const { data } = await client.get(
      `/document/received-document-detail/${documentId}`
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const getReceiver = async (email) => {
  try {
    const { data } = await client.get(`/user/searchReceiver?search=${email}`);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
