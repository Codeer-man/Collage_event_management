

    // import {checkAuth} from "../../../../utils/checkauth";

    // checkAuth().then(response => {
    //     if (response.status !== 200) {
    //         alert("You are not authorized to access this page. Redirecting to login.");
    //         window.location.href = "../../../../index.html";
    //     }
    // }).catch(error => {
    //     console.error("Error checking authentication:", error);
    //     alert("An error occurred while checking authentication. Redirecting to login.");
    //     window.location.href = "../../../../index.html";
    // });

    // Toggle Sidebar
    function toggleSidebar() {

        const sidebar = document.getElementById("sidebar");

        sidebar.classList.toggle("hide");

    }


    // Change Page Title
    function showPage(pageName, element) {

        document.getElementById("pageTitle").innerText = pageName;

        // Remove active class
        let menuItems = document.querySelectorAll(".sidebar-menu a");

        menuItems.forEach(function(item) {
            item.classList.remove("active");
        });

        // Add active class
        element.classList.add("active");

    }


    // Logout
    function logout() {

        alert("You have been logged out!");

        // Change this path according to your project
        window.location.href = "../../../../index.html";

    }

