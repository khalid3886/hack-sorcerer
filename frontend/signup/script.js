const loginForm = document.getElementById("newLogin");
const signupForm = document.getElementById("newSignup");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector(".signup-link a");
const loginText = document.querySelector(".titleText .login");
const signupText = document.querySelector(".titleText .signup");
const invalidspan = document.getElementById("invalid-text");

signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
};

loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
};

signupLink.onclick = () => {
  signupBtn.click();
  return false;
};

// BaseURL
// const baseURL = "http://localhost:6420/";

// const sendOtpButton = document.getElementById("send-otp");

// sendOtpButton.addEventListener("click", async function () {
//   const emailInput = document.getElementById("sign-up-email");
//   const email = emailInput.value;
//   console.log(email);
//   try {
//     const response = await fetch(`${baseURL}users/send-otp`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       invalidspan.innerHTML=`${data.msg}`; // Show success message
//       invalidspan.style.color = "green"
//     } else {
//       invalidspan.innerHTML=`${data.msg}`; // Show error message
//       invalidspan.style.color = "red"
//     }
//   } catch (error) {
//     console.error("Error:", error);
    
//     invalidspan.innerHTML= "Something went wrong !";
//   }
// });

// document.getElementById("register_btn").addEventListener("click", registerUser);
// async function registerUser() {
//   //getting elements
//   const username_input = document.getElementById("sign-up-username");
//   const password_input = document.getElementById("sign-up-password");
//   const email_input = document.getElementById("sign-up-email");
//   const otp_input = document.getElementById("sign-up-otp");
  
//   //getting values
//   const username = username_input.value;
//   const password = password_input.value;
//   const email = email_input.value;
//   const otp = otp_input.value;
//   try {
//     if (username && password && email && otp) {
//       const response = await fetch(`${baseURL}users/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password, email, otp }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         invalidspan.innerHTML=`${data.msg}`; // Show success message
//       invalidspan.style.color = "green"
//       } else {
//         invalidspan.innerHTML=`${data.msg}`; // Show success message
//          invalidspan.style.color = "red"
//         // checkCredentials("Invalid Otp or Password"); // Show error message
//       }
//     } else {
//       invalidspan.innerHTML= "Enter Your Details"
//       invalidspan.style.color = "red";
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     invalidspan.innerHTML= "Something went wrong"; // Show success message
//     invalidspan.style.color = "red"
//   }
// }
// CONNECTION
let url='https://hack-sorcerer.onrender.com'
document.getElementById('register_btn').addEventListener('click',()=>{
    const name=document.getElementById('sign-up-username').value
    const email=document.getElementById('sign-up-email').value
    const pass=document.getElementById('sign-up-password').value
    fetch(`${url}/users/signup`,{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            name, email,pass
        })
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.msg==='user has been registered')
        {
            // localStorage.setItem('name',data.name)
            invalidspan.innerHTML=`${data.msg}`;
            invalidspan.style.color = "green"
        }
    })
    .catch(err=>console.log(err))
})

// SIGNUP
document.getElementById('login-button').addEventListener('click',()=>{
    const email=document.getElementById('login-email').value
    const pass=document.getElementById('login-pass').value
    fetch(`${url}/users/login`,{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({email,
        pass})
    })
    .then(res=>res.json())
    .then(data=>{
        console.log("HELLO")
        console.log(data)
        if(data.msg==='login successfull')
        {
            console.log(data.user.email);
            localStorage.setItem("email", data.user.email);
            localStorage.setItem('token',data.access_token);
            localStorage.setItem('name',data.user.name);
            
            location.href= '../public/landing.html';
            
            // frontend\public\landing.html
        }
    })
    .catch(err=>console.log(err))
})
