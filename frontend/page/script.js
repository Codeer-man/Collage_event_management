// import { checkAuth } from "../utils/checkauth.js";

// =====================================================
// 1. API CONFIGURATION & CONSTANTS
// =====================================================

const API_URL = "http://localhost:5000";

const API_ENDPOINTS = {
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`,
    VERIFY_EMAIL: `${API_URL}/auth/verify-email`,
    FACULTY: `${API_URL}/auth/faculty`
};

// =====================================================
// 2. DOM ELEMENTS SELECTION
// =====================================================

// Authentication State UI
const loginButton = document.getElementById("openLogin");
const signupButton = document.getElementById("openSignup");
const profileButton = document.getElementById("homeProfileButton");

// Login Elements
const closeLogin = document.getElementById("closeLogin");
const loginOverlay = document.getElementById("loginOverlay");
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("password");
const loginTogglePassword = document.getElementById("togglePassword");

// Signup Elements
const closeSignup = document.getElementById("closeSignup");
const signupOverlay = document.getElementById("signupOverlay");
const signupForm = document.getElementById("signupForm");
const signupFullName = document.getElementById("signupFullName");
const signupFaculty = document.getElementById("signupFaculty");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupContact = document.getElementById("signupContact");
const signupImage = document.getElementById("signupImage");
const signupTogglePassword = document.getElementById("signupTogglePassword");
const signupMessage = document.getElementById("signupMessage");

// =====================================================
// 3. INITIALIZATION & AUTH CHECK
// =====================================================

document.addEventListener("DOMContentLoaded", async function () {
    await checkInitialAuth();
    loadFaculties();
    setupGlobalEventListeners();
});

async function checkInitialAuth() {
    try {
        const response = await checkAuth();
        console.log("Authentication status:", response.status);

        if (response.status === 200) {
            toggleAuthUI({ isLoggedIn: true });
        } else {
            toggleAuthUI({ isLoggedIn: false });
        }
    } catch (error) {
        console.error("Auth check error:", error);
        toggleAuthUI({ isLoggedIn: false });
    }
}

function toggleAuthUI({ isLoggedIn }) {
    if (loginButton) loginButton.style.display = isLoggedIn ? "none" : "inline-block";
    if (signupButton) signupButton.style.display = isLoggedIn ? "none" : "inline-block";
    if (profileButton) profileButton.style.display = isLoggedIn ? "flex" : "none";
}

// =====================================================
// 4. UTILITY & VALIDATION HELPERS
// =====================================================

function validatePassword(password) {
    // Min 8 characters, at least 1 uppercase, 1 lowercase, 1 digit, 1 special char
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$\%^&*]{8,}$/;
    return passwordPattern.test(password);
}

function validatePhone(phone) {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
}

function showMessage(message, type) {
    if (!signupMessage) return;
    signupMessage.textContent = message;
    signupMessage.className = `signup-message ${type}`;
}

// =====================================================
// 5. GLOBAL EVENT LISTENERS (MODALS & KEYBOARD)
// =====================================================

function setupGlobalEventListeners() {
    // Open Login
    if (loginButton) {
        loginButton.addEventListener("click", function (e) {
            e.preventDefault();
            if (loginOverlay) loginOverlay.classList.add("active");
            setTimeout(() => loginEmail?.focus(), 300);
        });
    }

    // Close Login
    if (closeLogin) {
        closeLogin.addEventListener("click", () => loginOverlay?.classList.remove("active"));
    }
    if (loginOverlay) {
        loginOverlay.addEventListener("click", (e) => {
            if (e.target === loginOverlay) loginOverlay.classList.remove("active");
        });
    }

    // Open Signup
    if (signupButton) {
        signupButton.addEventListener("click", function (e) {
            e.preventDefault();
            if (signupOverlay) signupOverlay.classList.add("active");
        });
    }

    // Close Signup
    if (closeSignup) {
        closeSignup.addEventListener("click", () => signupOverlay?.classList.remove("active"));
    }
    if (signupOverlay) {
        signupOverlay.addEventListener("click", (e) => {
            if (e.target === signupOverlay) signupOverlay.classList.remove("active");
        });
    }

    // ESC Key to close active modals
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            loginOverlay?.classList.remove("active");
            signupOverlay?.classList.remove("active");
        }
    });

    // Password Visibility Toggles
    if (loginTogglePassword && loginPassword) {
        loginTogglePassword.addEventListener("click", () => {
            loginPassword.type = loginPassword.type === "password" ? "text" : "password";
        });
    }

    if (signupTogglePassword && signupPassword) {
        signupTogglePassword.addEventListener("click", () => {
            signupPassword.type = signupPassword.type === "password" ? "text" : "password";
        });
    }
}

// =====================================================
// 6. EMAIL VERIFICATION API
// =====================================================

async function verifyEmail(token) {
    if (!token) {
        console.error("Verification token is missing.");
        return false;
    }

    try {
        const response = await fetch(`${API_ENDPOINTS.VERIFY_EMAIL}?token=${encodeURIComponent(token)}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        console.log("Email verification response:", data);

        if (!response.ok) {
            console.error(data.message || "Email verification failed.");
            return false;
        }

        console.log(data.message || "Email verified successfully!");
        return true;
    } catch (error) {
        console.error("Email verification error:", error);
        return false;
    }
}

// =====================================================
// 7. LOGIN PROCESS
// =====================================================

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = loginEmail.value.trim();
        const password = loginPassword.value;

        // Validation
        if (!email) {
            alert("Please enter your email.");
            loginEmail.focus();
            return;
        }

        if (!password) {
            alert("Please enter your password.");
            loginPassword.focus();
            return;
        }

        const submitButton = loginForm.querySelector("button[type='submit']");

        try {
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Logging in...";
            }

            // Login API Call
            const response = await fetch(API_ENDPOINTS.LOGIN, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log("Login response:", data);

            if (!response.ok) {
                alert(data.message || "Login failed. Please check your email and password.");
                return;
            }

            // Store Local Credentials
            if (data.token) localStorage.setItem("token", data.token);
            if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

            alert(data.message || "Login successful!");
            loginOverlay?.classList.remove("active");

            // Role-Based Navigation Routing
            const userRole = (data.user?.role || data.user?.data?.role || "").toString().trim().toLowerCase();

            const routes = {
                admin: "/Collage_event_management/frontend/page/auth/admin/superadmin/admindashboard.html",
                student: "/Collage_event_management/frontend/page/student/student.html"
            };

            if (routes[userRole]) {
                window.location.replace(routes[userRole]);
            } else {
                alert(`Unrecognized role: "${userRole}". Please contact support.`);
            }

        } catch (error) {
            console.error("Login error:", error);
            alert("Unable to connect to the server. Please make sure your backend is running.");
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Login";
            }
        }
    });
}

// =====================================================
// 8. SIGNUP PROCESS & REDIRECT TO LOGIN
// =====================================================

// Load Faculty Options
async function loadFaculties() {
    if (!signupFaculty) return;

    try {
        signupFaculty.innerHTML = `<option value="" selected disabled>Loading faculties...</option>`;

        const response = await fetch(API_ENDPOINTS.FACULTY);
        if (!response.ok) throw new Error("Failed to fetch faculties");

        const result = await response.json();
        console.log("Faculties received:", result);

        signupFaculty.innerHTML = `<option value="" selected disabled>Select Faculty</option>`;
        const faculties = result.data?.faculty || [];

        if (!Array.isArray(faculties)) {
            throw new Error("Invalid faculty data received from server");
        }

        faculties.forEach((faculty) => {
            const option = document.createElement("option");
            option.value = faculty.id;
            option.textContent = `${faculty.faculty_name} (${faculty.program_code})`;
            signupFaculty.appendChild(option);
        });

    } catch (error) {
        console.error("Faculty loading error:", error);
        signupFaculty.innerHTML = `<option value="" disabled selected>Unable to load faculties</option>`;
    }
}

// Handle Form Submission
if (signupForm) {
    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const fullName = signupFullName.value.trim();
        const faculty = signupFaculty.value;
        const email = signupEmail.value.trim();
        const password = signupPassword.value;
        const contactNumber = signupContact.value.trim();
        const image = signupImage.files[0];

        // Validations
        if (!fullName) return showMessage("Please enter your full name.", "error");
        if (!faculty) return showMessage("Please select your faculty.", "error");
        if (!email) return showMessage("Please enter your email.", "error");

        if (!validatePassword(password)) {
            return showMessage(
                "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character.",
                "error"
            );
        }

        if (!validatePhone(contactNumber)) {
            return showMessage("Contact number must contain exactly 10 digits.", "error");
        }

        if (!image) return showMessage("Please select a profile image.", "error");
        if (!image.type.startsWith("image/")) return showMessage("Please select a valid image file.", "error");
        if (image.size > 5 * 1024 * 1024) return showMessage("Image size must be less than 5 MB.", "error");

        // Form Payload (Using FormData directly for multipart upload)
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("faculty", faculty);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("contactNumber", contactNumber);
        formData.append("image", image);

        // API Call
        try {
            // Note: Do NOT set "Content-Type" header when sending FormData; 
            // the browser sets multipart/form-data with the correct boundary automatically.
            const response = await fetch(API_ENDPOINTS.REGISTER, {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Server Validation Error:", data);
                showMessage(data.message || "Registration failed.", "error");
                return;
            }

            console.log("Registration response:", data);

            // Success feedback
            showMessage(
                data.message || "Account created successfully! Redirecting to login...",
                "success"
            );

            // Reset signup form input fields
            signupForm.reset();

            // Transition directly to Login Modal
            setTimeout(() => {
                // Hide Signup Overlay
                signupOverlay?.classList.remove("active");
                if (signupMessage) signupMessage.textContent = "";

                // Display Login Overlay & Auto-focus Email input
                if (loginOverlay) {
                    loginOverlay.classList.add("active");
                    setTimeout(() => loginEmail?.focus(), 300);
                }
            }, 2000);

        } catch (error) {
            console.error("Registration error:", error);
            showMessage("Unable to connect to the server. Please make sure your backend is running.", "error");
        }
    });
}