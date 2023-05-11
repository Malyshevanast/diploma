const baseURL = "http://localhost:8080/api/v1";

export const getData = async (path) => {
  const headers = { "Content-Type": "application/json" };

  const token = localStorage.getItem("token");
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${baseURL}${path}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .catch(() => ({
      success: false,
      code: "NETWORK_ERROR",
      message: "Network error",
    }));

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
  const headers = {};
  const formData = new FormData();

  const data = Object.entries(body);

  data.map(([key, value]) => {
    if (key === "files") {
      for (let i = 0; i < value.length; i++) {
        const file = value[i];
        formData.append(key, file, file.name);
      }
    }
    return formData.append(key, value);
  });

  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${baseURL}${path}`, {
    method: "POST",
    headers,
    body: formData,
  })
    .then((res) => res.json())
    .catch(() => ({
      success: false,
      code: "NETWORK_ERROR",
      message: "Network error",
    }));

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