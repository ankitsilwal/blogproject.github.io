const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (()=>{
 loginForm.style.marginLeft = "-50%";
 loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
 loginForm.style.marginLeft = "0%";
 loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
 signupBtn.click();
 return false;
});


document.addEventListener("DOMContentLoaded", () => {
    const signInForm = document.querySelector(".login");
    const signUpForm = document.querySelector(".signup");
  
    signInForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const formData = new FormData(signInForm);
      const username = formData.get("username");
      const password = formData.get("password");
  
      if (!username || !password) {
        console.error("Username and password are required.");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:3000/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
  
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error("Error signing in:", error.message);
      }
    });
  
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
            pnumber:phoneNumber,
            password,
            role
          }),
        });
        // console.log(response);
  
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
  