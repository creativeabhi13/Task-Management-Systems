import axios from "axios";

// Create an Axios instance with the base URL and default headers
const instance = axios.create({
  baseURL: "http://localhost:5001/api",

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Function for making GET requests with token authorization
export const dataFetch = (url, token) =>
  instance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Function for making POST requests
export const dataPost = (url, data, token) =>
  instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Function for making PUT requests
export const dataUpdate = (url, data, token) =>
  instance.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Function for making DELETE requests
export const dataDelete = (url, token) =>
  instance.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Modify the request before sending it, if necessary
    return config;
  },
  function (error) {
    console.log("Interceptor Error", error);
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
    console.log("Interceptor Error", error);
    return Promise.reject(error);
  }
);
