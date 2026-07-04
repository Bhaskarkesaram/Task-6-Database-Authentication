// =====================================
// API URL
// =====================================

const API_URL = "https://task-6-database-authentication.onrender.com/api/auth";

// =====================================
// Get Elements
// =====================================

const registerForm =
document.getElementById("registerForm");

const loginForm =
document.getElementById("loginForm");

const message =
document.getElementById("message");

// =====================================
// Show Message
// =====================================

function showMessage(text,type){

    message.innerHTML = text;

    message.className = type;

    setTimeout(()=>{

        message.innerHTML = "";

    },3000);

}

// =====================================
// REGISTER USER
// =====================================

if(registerForm){

registerForm.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const userData = {
        name:
        document.getElementById("name").value,

        email:
        document.getElementById("email").value,

        password:
        document.getElementById("password").value
    };

    try{
        const response =
        await fetch(`${API_URL}/register`,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:
            JSON.stringify(userData)

        });

        const data =
        await response.json();

        if(data.success){

            showMessage(

            "Registration Successful ✅",

            "success"

            );

            setTimeout(()=>{
                window.location.href =
                "login.html";
            },1500);
        }

        else{

            showMessage(

            data.message,

            "error"

            );
        }
    }

    catch(error){

        showMessage(

        "Server Error ❌",

        "error"

        );
    }
});

}

// =====================================
// LOGIN USER
// =====================================

if(loginForm){

loginForm.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const loginData = {

        email:
        document.getElementById("loginEmail").value,

        password:
        document.getElementById("loginPassword").value

    };

    try{

        const response =
        await fetch(`${API_URL}/login`,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:
            JSON.stringify(loginData)

        });

        const data =
        await response.json();

        if(data.success){

            // Save JWT Token

            localStorage.setItem(

            "token",

            data.token

            );

            showMessage(

            "Login Successful 🔐",

            "success"

            );

            setTimeout(()=>{

                window.location.href =
                "dashboard.html";

            },1500);

        }

        else{

            showMessage(

            data.message,

            "error"

            );

        }
    }

    catch(error){

        showMessage(

        "Server Error ❌",

        "error"

        );
    }
});

}