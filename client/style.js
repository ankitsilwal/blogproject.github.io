document.addEventListener("DOMContentLoaded", () => {
  const signUpForm = document.querySelector(".signup");

  signInForm.addEventListener("submit", async (event) => {});

  signUpForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(signUpForm);
    const username = formData.get("username");
    const phoneNumber = formData.get("pnumber");
    const password = formData.get("password");
    const role = formData.get("role");

    if (!username || !phoneNumber || !password) {
      console.error("Username, phone number, and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          pnumber: phoneNumber,
          password,
          role,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  });
});

function signin(event) {
  console.log(event);
  event.preventDefault();
  const signInForm = document.querySelector(".login");
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  // const formData = new FormData(signInForm);
  // const username = formData.get("username");
  // const password = formData.get("password");
  console.log({ username, password });
  if (!username || !password) {
    console.error("Username and password are required.");
    return;
  }

  // try {
  //   const response = await fetch("http://localhost:3000/auth/signin", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username,
  //       password,
  //     }),
  //   });
  //   console.log("hello");
  //   if (!response.ok) {
  //     throw new Error(`Error: ${response.status} - ${response.statusText}`);
  //   }

  //   const result = await response.json();

  //   // Store the access token in an HTTP-only cookie
  //   document.cookie = `authToken=${result.accessToken}; Secure; HttpOnly; SameSite=Strict`;

  //   // window.location.href = "index.html";
  //   // console.log(result);
  // } catch (error) {
  //   console.error("Error signing in:", error.message);
  // }
}
