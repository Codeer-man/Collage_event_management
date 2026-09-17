 import {checkAuth} from "../../../../utils/checkauth";

    checkAuth().then(response => {
        if (response.status !== 200) {
            alert("You are not authorized to access this page. Redirecting to login.");
            window.location.href = "../../../../index.html";
        }
    }).catch(error => {
        console.error("Error checking authentication:", error);
        alert("An error occurred while checking authentication. Redirecting to login.");
        window.location.href = "../../../../index.html";
    });
    // ==========================================
    // 1. LOAD FACULTIES FROM BACKEND
    // ==========================================
    async function loadFaculties() {
        try {
            const response = await fetch("http://localhost:5000/auth/faculty");

            if (!response.ok) {
                throw new Error("Failed to fetch faculties");
            }

            const result = await response.json();
            console.log("Faculties received:", result);

            const facultySelect = document.getElementById("faculty");
            facultySelect.innerHTML = '<option value="">Select Faculty</option>';

            // Access nested array matching Postman structure: result.data.faculty
            const faculties = result.data?.faculty || [];

            faculties.forEach(faculty => {
                const option = document.createElement("option");
                option.value = faculty.id;
                option.textContent = `${faculty.faculty_name} (${faculty.program_code})`;
                facultySelect.appendChild(option);
            });

        } catch (error) {
            console.error("Faculty Error:", error);
            document.getElementById("faculty").innerHTML =
                '<option value="">Failed to load faculties</option>';
        }
    }

    // Load faculties on page cd front
    loadFaculties();

    // 2. REGISTRATION FORM SUBMISSION
    document.getElementById("registerForm").addEventListener("submit", async function(e) {
        e.preventDefault();

        let fullname = document.getElementById("fullname").value.trim();
        let username = document.getElementById("username").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value;
        let faculty = document.getElementById("faculty").value;
        let phone = document.getElementById("phone").value.trim();
        let image = document.getElementById("image").files[0];
        let message = document.getElementById("message");

        // Client-side Validations
        if (fullname === "") {
            message.style.color = "red";
            message.innerHTML = "Please enter your full name.";
            return;
        }

        if (username === "") {
            message.style.color = "red";
            message.innerHTML = "Please enter username.";
            return;
        }

        let passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#])[A-Za-z0-9@#]{8,}$/;
        if (!passwordPattern.test(password)) {
            message.style.color = "red";
            message.innerHTML = "Password must have minimum 8 characters, 1 uppercase, 1 number and 1 symbol (@ or #).";
            return;
        }

        if (faculty === "") {
            message.style.color = "red";
            message.innerHTML = "Please select faculty.";
            return;
        }

        if (phone.length !== 10) {
            message.style.color = "red";
            message.innerHTML = "Phone number must contain 10 digits.";
            return;
        }

        if (!image) {
            message.style.color = "red";
            message.innerHTML = "Please upload profile image.";
            return;
        }

      
        // 3. SEND MULTIPART/FORM-DATA TO BACKEND
        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("faculty", faculty);
        formData.append("phone", phone);
        formData.append("image", image); // Appends the actual binary file object

        message.style.color = "blue";
        message.innerHTML = "Registering...";

        try {
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                body: formData // FormData automatically sets boundary and headers
            });

            const responseData = await response.json();

            if (response.ok) {
                message.style.color = "green";
                message.innerHTML = responseData.message || "Registration Successful!";
                document.getElementById("registerForm").reset();
            } else {
                message.style.color = "red";
                message.innerHTML = responseData.message || "Registration failed. Please try again.";
            }
        } catch (error) {
            console.error("Registration Request Error:", error);
            message.style.color = "red";
            message.innerHTML = "Server error. Could not complete registration.";
        }
    });
    const imageInput = document.getElementById('image');
const preview = document.getElementById('preview');
const errorMsg = document.getElementById('error');

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

imageInput.addEventListener('change', (event) => {
  errorMsg.textContent = '';
  const file = event.target.files[0];

  if (!file) {
    preview.style.display = 'none';
    return;
  }

  // Validate type
  if (!ALLOWED_TYPES.includes(file.type)) {
    errorMsg.textContent = 'Please upload a JPG, PNG, or WEBP image.';
    imageInput.value = ''; // reset input
    preview.style.display = 'none';
    return;
  }

  // Validate size
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    errorMsg.textContent = `Image must be under ${MAX_SIZE_MB}MB.`;
    imageInput.value = '';
    preview.style.display = 'none';
    return;
  }

  // Show preview
  const reader = new FileReader();
  reader.onload = (e) => {
    preview.src = e.target.result;
    preview.style.display = 'block';
  };
  reader.readAsDataURL(file);
});
