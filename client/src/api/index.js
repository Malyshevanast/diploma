const baseURL = "/api/v1";

export const getData = async (path) => {
  try {
    const headers = { "Content-Type": "application/json" };

    const token = localStorage.getItem("token");
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${baseURL}${path}`, {
      method: "GET",
      headers,
    });

    return response.json();
  } catch (error) {
    return console.error(error);
  }
};

export const postData = async (path, body) => {
  try {
    const headers = {};
    const formData = new FormData();
    const data = Object.entries(body);
    console.log(data);
    data.map(([key, value]) => {
      if (key === "files") {
        for (let i = 0; i < value.length; i++) {
          const file = value[i];
          formData.append(key, file, file.name);
        }
      }

      if (Array.isArray(value) || typeof value === "object") {
        return formData.append(key, JSON.stringify(value));
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
    });

    return response.json();
  } catch (error) {
    return console.error(error);
  }
};
