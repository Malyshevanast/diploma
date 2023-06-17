const baseURL = "http://localhost:8090";

export const getData = async (path) => {
  const headers = { "Content-Type": "application/json" };

  const token = localStorage.getItem("token");
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${baseURL}/api/v1/${path}`, {
    method: "GET",
    headers,
  });

  if (!response.success) {
    if (!response.code) {
      response.code = "SOMETHING_WRONG";
    }
    if (!response.message) {
      response.message = response.code;
    }
  }

  return response;
};

export const postData = async (path, body) => {
  // const headers = { "Content-Type": "application/json" };
  const headers = {};
  const formData = new FormData();

  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${baseURL}/api/v1/${path}`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.success) {
    if (!response.code) {
      response.code = "SOMETHING_WRONG";
    }
    if (!response.message) {
      response.message = response.code;
    }
  }

  return response;
};
