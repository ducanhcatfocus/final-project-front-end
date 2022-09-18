import client from "./client";

export const sendDocument = async (document, flow) => {
  try {
    if (Array.isArray(document.email)) {
      document.email = JSON.stringify(document.email);
      document.type = "multiple";
    }
    const { data } = await client.post(
      `/document/send-document?flow=${flow}`,
      document,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const receivedDocument = async () => {
  try {
    const { data } = await client.get("/document/received-document");
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const myDocument = async (documentId) => {
  console.log(documentId);
  const { documentId: document, status } = documentId;
  try {
    const { data } = await client.get(
      `/document/my-document?documentId=${document}&status=${status}`
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
