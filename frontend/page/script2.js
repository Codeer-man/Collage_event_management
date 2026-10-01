
import { checkAuth } from "../utils/checkauth.js";


// =====================================================
// API CONFIGURATION
// =====================================================

const API_URL = "http://localhost:5000";

document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // PROFILE DROPDOWN
    // ==============================

    const profileButton =
        document.getElementById("homeProfileButton");

    const profileDropdown =
        document.getElementById("homeProfileDropdown");

    const dashboardButton =
        document.getElementById("dashboardButton");

    const homeButton =
        document.getElementById("homeDropdownItem");

    const settingsButton =
        document.getElementById("settingsButton");

    const logoutButton =
        document.getElementById("homeLogoutButton");


    // Check elements
    if (!profileButton || !profileDropdown) {
        console.error("Profile dropdown elements not found");
        return;
    }


    // ==============================
    // OPEN / CLOSE DROPDOWN
    // ==============================

    profileButton.addEventListener("click", function (event) {

        event.stopPropagation();

        profileDropdown.classList.toggle("show");

        profileButton.classList.toggle("open");

    });


    // ==============================
    // CLOSE WHEN CLICKING OUTSIDE
    // ==============================

    document.addEventListener("click", function (event) {

        if (
            !profileButton.contains(event.target) &&
            !profileDropdown.contains(event.target)
        ) {

            profileDropdown.classList.remove("show");

            profileButton.classList.remove("open");

        }

    });


    // ==============================
    // DASHBOARD
    // ==============================

    dashboardButton.addEventListener("click", function () {

        window.location.href =
            "http://127.0.0.1:5500/Collage_event_management/frontend/page/student/student.html";

    });


    // ==============================
    // SETTINGS
    // ==============================

    settingsButton.addEventListener("click", function () {

        alert("Settings clicked");

    });


    // ==============================
    // LOGOUT
    // ==============================
logoutButton.addEventListener("click", async function (event) {
    event.preventDefault();

    try {
        await fetch("http://localhost:5000/auth/logout", {
            method: "POST",
            credentials: "include"
        });
    } catch (error) {
        console.error("Logout error:", error);
    } finally {
        // Clear stored tokens and user data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.clear();

        // Call replace as a function to navigate without saving history
        window.location.replace(
            "http://127.0.0.1:5500/Collage_event_management/frontend/page/index.html"
        );
    }
});

});