import axios from "axios";

function loginUser(email, password) {
  return axios.post('https://bcec696dad7a74e988364eac6abea523.serveo.net/api/auth/', {
    email: email,
    password: password
  })
  .then(function (response) {
    console.log("Login successful:", response.data);
    // Optionally, you can return the response data for further processing
    return response.data;
  })
  .catch(function (error) {
    console.error("Error during login:", error);
    throw error; // Re-throw the error for the calling code to handle
  });
}

export default loginUser;