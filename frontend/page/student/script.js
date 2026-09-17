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

    /* Show Selected Page */
    function showPage(pageName, element) {

        document.getElementById("pageTitle").innerText = pageName;

        let menuItems = document.querySelectorAll(".sidebar-menu a");

        menuItems.forEach(function(item) {
            item.classList.remove("active");
        });

        element.classList.add("active");

    }


    /* Open and Close Profile Dropdown */
    function toggleProfile() {

        document
            .getElementById("profileDropdown")
            .classList.toggle("show");

    }


    /* Logout */
    function logout() {

        // Remove token from localStorage
        localStorage.removeItem("token");

        alert("You have been logged out!");

        // Go to Home Page
        window.location.href = "../../index.html";


    }

