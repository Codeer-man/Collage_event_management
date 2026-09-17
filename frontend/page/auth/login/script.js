//  import {checkAuth} from "../../../../utils/checkauth";

//     checkAuth().then(response => {
//         if (response.status !== 200) {
//             alert("You are not authorized to access this page. Redirecting to login.");
//             window.location.href = "../../../../index.html";
//         }
//     }).catch(error => {
//         console.error("Error checking authentication:", error);
//         alert("An error occurred while checking authentication. Redirecting to login.");
//         window.location.href = "../../../../index.html";
//     });
document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");
    console.log(email);
    
    async function loginUser() {
        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
           
            
            const data = await response.json();
            console.log(data.data.user,"data");
            
            if (response.ok) {
                message.style.color = "green";
                message.textContent = "Login successful! Redirecting...";
             
                if(data.data.user.role === "admin"){
                    window.location.href = "http://127.0.0.1:5500/Collage_event_management/frontend/page/auth/admin/superadmin/admindashboard.html";
                } if(data.data.user.role === "student"){
                    window.location.href = "http://127.0.0.1:5500/Collage_event_management/frontend/page/student/student.html";
                }
                
               
            } else {
                message.style.color = "red";
                message.textContent = data.message || "Login failed. Please try again.";
            }
        } catch (error) {
            console.error("Error during login:", error);
            message.style.color = "red";
            message.textContent = "An error occurred. Please try again later.";
        }
    }
loginUser()
})

