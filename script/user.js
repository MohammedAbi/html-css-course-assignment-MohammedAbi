const loginUser = async (url, email, password) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Correct header name
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const responseData = await response.json();
      // console.log("UserDetails;", responseData); // Log the response data
      return responseData.token; // Return the token from the response
    } else {
      throw new Error("Login failed with status: " + response.status);
    }
  } catch (error) {
    throw new Error("Failed to login user: " + error.message);
  }
};

export { loginUser };
