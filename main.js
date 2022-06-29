import axios from "axios";

// GET POST PUT DEL using JSON PLACEHOLDER

// creating axios config
const BASE_URL = "https://jsonplaceholder.typicode.com";

const controller = new AbortController();

const instance = axios.create({
  baseURL: BASE_URL,
  signal: controller.signal, // register the signal into axios
  headers: { "Content-Type": "application/json" },
});

// if you want to abort the signal you can just  use
// controller.abort(); // you won't get the data by calling this

// the documentation explain that this will be executed before the request is sent to the server
instance.interceptors.request.use((config) => {
  console.log("the config", config);
  config.headers["Authorization"] = "Bearer 123456";
  return config;
});

// this will be executed as the request is sent back to the client side so before applying to HTTP method this will be called first
instance.interceptors.response.use((response) => {
  console.log("response", response);
  return response;
});

// Get Data from placeholder
const getPost = async () => {
  return await instance.get("/posts");
};

getPost().then((data) => console.log("Get Post Data", data));

// Post Data from placeholder
const createPost = async () => {
  return await instance.post("/posts", { body: "Hello World!" });
};
// createPost().then((data) => console.log("Create New Post Data", data));

// Put Data from placeholder
const updateData = async () => {
  return await instance.put("/posts/1", { body: "Hello World!" });
};
// updateData().then((data) => console.log("Update Data", data));

// Delete Data from placeholder
const deleteData = async () => {
  return await instance.delete("/posts/1");
};
// deleteData().then((data) => console.log("Deleted a Post Data", data));

// how to intercept data
