import axios from "axios";

// Create an Axios instance with the base URL and default headers
const instance = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem("token"); // Adjust the token key if it's different in your app
};

// Function for making GET requests with token authorization
export const dataFetch = (url) => {
  const token = getToken();
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function for making POST requests with token authorization
export const dataPost = (url, data) => {
  const token = getToken();
  return instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function for making PUT requests with token authorization
export const dataUpdate = (url, data) => {
  const token = getToken();
  return instance.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function for making DELETE requests with token authorization
export const dataDelete = (url) => {
  const token = getToken();
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // You can modify the request before sending it if necessary
    return config;
  },
  function (error) {
    console.error("Interceptor Error", error);
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    console.log("Interceptor Response", response);
    return response;
  },
  function (error) {
    console.error("Interceptor Error", error);
    return Promise.reject(error);
  }
);
