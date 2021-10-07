import axios from "axios";

function useExample() {
  const url = "http://api.com/test";

  // AXIOS
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    },
    data: {
      a: 10,
      b: 20,
    },
    timeout: 5000,
  };

  axios(config)
    .then((response) => {
      console.log(response.data);
      console.log(response.status);
      console.log(response.headers);
    })
    .catch((error) => {
      // Request was made and server responded
      if (error.response) {
        console.error(error.response.status);
        console.error(error.response.data?.name);
        console.error(error.response.data?.message);
      }
      // Request was made but server didn't respond
      else if (error.request) {
        console.error(error.request);
      }
      // Other error
      else {
        console.error(error);
      }
    });

  // Method aliases
  // axios.post(url, data, config)

  // FETCH API
  const controller = new AbortController();

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    },
    // Has to stringify first
    body: JSON.stringify({
      a: 10,
      b: 20,
    }),
    signal: controller.signal,
  };

  const timeoutId = setTimeout(() => controller.abort(), 4000);

  fetch(url, options)
    .then((response) => {
      console.log(response.status);
    })
    .catch((error) => {
      console.error(error);
    });
}
