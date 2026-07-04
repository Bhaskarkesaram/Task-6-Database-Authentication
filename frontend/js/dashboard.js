// =================================
// API URL
// =================================

const API_URL =
"https://task-6-database-authentication.onrender.com/api/data/dashboard";



// =================================
// Elements
// =================================

const welcomeText =
document.getElementById("welcomeText");


const secureData =
document.getElementById("secureData");


const logoutBtn =
document.getElementById("logoutBtn");




// =================================
// Get Token
// =================================

const token =
localStorage.getItem("token");



// =================================
// Check Authentication
// =================================

if(!token){


    window.location.href =
    "login.html";


}



// =================================
// Load Protected Dashboard
// =================================


async function loadDashboard(){


try{


    const response =
    await fetch(API_URL,{


        method:"GET",


        headers:{


            Authorization:
            `Bearer ${token}`


        }


    });



    const data =
    await response.json();




    if(data.success){



        welcomeText.innerHTML =
        "Authentication Successful ✅";



        secureData.innerHTML =
        data.message;



    }


    else{


        localStorage.removeItem("token");


        window.location.href =
        "login.html";


    }




}


catch(error){


    secureData.innerHTML =
    "Server Error ❌";


}


}




// =================================
// Logout
// =================================


logoutBtn.addEventListener(
"click",
()=>{


    localStorage.removeItem(
    "token"
    );



    window.location.href =
    "login.html";


});




// =================================
// Run
// =================================


loadDashboard();
