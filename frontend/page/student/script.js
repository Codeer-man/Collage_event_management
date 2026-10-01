import { getUrl } from "../../utils/getUrl.js";
import { checkAuth } from "../../utils/checkauth.js";

const API_URL = getUrl();
let currentEditingEventId = null; // Tracks whether we are creating or updating

// Universal Toast helper function
function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

document.addEventListener("DOMContentLoaded", async () => {
  // Re-initialize Lucide Icons helper
  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  refreshIcons();

  // -----------------------------------------------------
  // 0. AUTHENTICATION CHECK
  // -----------------------------------------------------
  if (typeof checkAuth === "function") {
    try {
      await checkAuth();
    } catch (err) {
      console.error("Auth check failed:", err);
    }
  }

  // Helper for Headers with Auth Token
  function getAuthHeaders(isJson = false) {
    const headers = {};
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    if (isJson) {
      headers["Content-Type"] = "application/json";
    }
    return headers;
  }

  // -----------------------------------------------------
  // 1. SIDEBAR & PAGE SWITCHING NAVIGATION
  // -----------------------------------------------------
  const menuItems = document.querySelectorAll(".nav-item, .menu-item");
  const pages = document.querySelectorAll(".page");

  function switchPage(pageId) {
    menuItems.forEach((item) => {
      if (item.getAttribute("data-page") === pageId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    pages.forEach((page) => {
      if (page.id === pageId) {
        page.classList.remove("hidden");
        page.classList.add("active");
      } else {
        page.classList.add("hidden");
        page.classList.remove("active");
      }
    });

    // Trigger data fetching when switching pages
    if (pageId === "my-events" || pageId === "events") {
      fetchEvents();
    }
  }

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const targetPage = item.getAttribute("data-page");
      if (targetPage) {
        switchPage(targetPage);
      }
    });
  });

  // -----------------------------------------------------
  // 2. PROFILE DROPDOWN & MENU ACTIONS
  // -----------------------------------------------------
  const profileButton = document.getElementById("profileButton");
  const profileDropdown = document.getElementById("profileDropdown");

  if (profileButton && profileDropdown) {
    profileButton.addEventListener("click", (event) => {
      event.stopPropagation();
      profileDropdown.classList.toggle("hidden");
      profileDropdown.classList.toggle("show");
      profileButton.classList.toggle("open");
    });

    document.addEventListener("click", (event) => {
      if (!profileDropdown.contains(event.target) && !profileButton.contains(event.target)) {
        profileDropdown.classList.add("hidden");
        profileDropdown.classList.remove("show");
        profileButton.classList.remove("open");
      }
    });
  }

  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      const option = item.getAttribute("data-dropdown");

      if (profileDropdown && profileButton) {
        profileDropdown.classList.add("hidden");
        profileDropdown.classList.remove("show");
        profileButton.classList.remove("open");
      }

      if (option === "dashboard") {
        switchPage("profile");
      } else if (option === "home") {
        window.location.href = "../index2.html";
      } else if (option === "settings") {
        showToast("Settings panel opened", "info");
      }
    });
  });

  // -----------------------------------------------------
  // 3. LOGOUT HANDLING
  // -----------------------------------------------------
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();

      showToast("Logging out...", "info");

      try {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          credentials: "include"
        });
      } catch (error) {
        console.error("Logout API error:", error);
      } finally {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.clear();
        window.location.replace("../index.html");
      }
    });
  }

  // -----------------------------------------------------
  // 4. THEME TOGGLE & NOTIFICATIONS
  // -----------------------------------------------------
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
    });
  }

  const notificationBtn = document.getElementById("notificationButton");
  if (notificationBtn) {
    notificationBtn.addEventListener("click", () => {
      showToast("You have no new notifications.", "info");
    });
  }

  // -----------------------------------------------------
  // 5. LOAD STUDENT PROFILE DATA FROM BACKEND
  // -----------------------------------------------------
  async function loadStudentProfile() {
    try {
      const response = await fetch(`${API_URL}/user/profile`, {
        method: "GET",
        headers: getAuthHeaders(true),
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error(`Failed to load profile. Status: ${response.status}`);
      }

      const data = await response.json();
      const student = data.user || data.student || data;

      const fullName = student.fullName || student.full_name || student.name || "Student";
      const email = student.email || student.emailAddress || "Not available";
      const facultyId = student.facultyId || student.faculty_id || student.faculty || "Not assigned";
      const role = student.role || "student";
      const studentId = student.id || student.studentId || student.student_id || student._id || "Not available";

      const approved = student.isApprovedStudent ?? student.is_approved_student ?? student.approved ?? false;
      const verified = student.isEmailVerified ?? student.is_email_verified ?? student.emailVerified ?? false;

      // Render Header & Avatar
      const headerUserName = document.getElementById("headerUserName");
      const profileNameEl = document.getElementById("profileName");
      const avatarEl = document.getElementById("studentAvatar");
      const headerAvatarEl = document.getElementById("headerAvatar");

      if (headerUserName) headerUserName.textContent = fullName.split(" ")[0];
      if (profileNameEl) profileNameEl.textContent = fullName;
      if (avatarEl) avatarEl.textContent = fullName.charAt(0).toUpperCase();
      if (headerAvatarEl) headerAvatarEl.textContent = fullName.charAt(0).toUpperCase();

      // Render Card Info
      const fullNumEl = document.getElementById("fullName");
      const emailEl = document.getElementById("emailAddress");
      const facultyEl = document.getElementById("facultyId");
      const roleEl = document.getElementById("studentRole");
      const idEl = document.getElementById("studentId");

      if (fullNumEl) fullNumEl.textContent = fullName;
      if (emailEl) emailEl.textContent = email;
      if (facultyEl) facultyEl.textContent = facultyId;
      if (roleEl) roleEl.textContent = role;
      if (idEl) idEl.textContent = studentId;

      // Status Identifiers
      const accountStatusEl = document.getElementById("accountStatus");
      const approvalEl = document.getElementById("studentApproval");
      const emailStatusEl = document.getElementById("emailStatus");

      if (accountStatusEl) accountStatusEl.textContent = student.isActive === false ? "Inactive" : "Active";
      if (approvalEl) approvalEl.textContent = approved ? "Approved" : "Pending";
      if (emailStatusEl) emailStatusEl.textContent = verified ? "Verified" : "Not Verified";

    } catch (error) {
      console.error("Error loading student profile:", error);
      ["fullName", "emailAddress", "facultyId", "studentRole", "studentId"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.textContent = "Unable to load";
      });
    }
  }

  loadStudentProfile();

  // -----------------------------------------------------
  // 6. EVENT CREATION WIZARD MULTI-STEP NAVIGATION
  // -----------------------------------------------------
  const stepItems = document.querySelectorAll(".step-item");
  const stepSections = document.querySelectorAll(".form-section-card");

  function goToStep(stepNum) {
    stepItems.forEach((item) => {
      const s = parseInt(item.getAttribute("data-step"), 10);
      item.classList.remove("active");
      if (s === stepNum) {
        item.classList.add("active");
      }
      if (s < stepNum) {
        item.classList.add("completed");
      } else {
        item.classList.remove("completed");
      }
    });

    stepSections.forEach((section, index) => {
      if (index + 1 === stepNum) {
        section.classList.remove("hidden");
        section.classList.add("active-section");
      } else {
        section.classList.add("hidden");
        section.classList.remove("active-section");
      }
    });
  }

  stepItems.forEach((item) => {
    item.addEventListener("click", () => {
      const s = parseInt(item.getAttribute("data-step"), 10);
      goToStep(s);
    });
  });

  document.querySelectorAll(".next-step-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextStep = parseInt(btn.getAttribute("data-next"), 10);
      goToStep(nextStep);
    });
  });

  document.querySelectorAll(".prev-step-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const prevStep = parseInt(btn.getAttribute("data-prev"), 10);
      goToStep(prevStep);
    });
  });

  // Toggle Solo / Team Format
  const teamSizeRow = document.getElementById("teamSizeRow");
  document.querySelectorAll("#teamTypeToggle .toggle-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#teamTypeToggle .toggle-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const format = btn.getAttribute("data-format");
      if (teamSizeRow) {
        teamSizeRow.style.display = format === "Solo" ? "none" : "flex";
      }
    });
  });

  // -----------------------------------------------------
  // 7. TAGS MANAGEMENT
  // -----------------------------------------------------
  const tagInput = document.getElementById("tagInput");
  const tagsContainer = document.getElementById("tagsContainer");

  function addTagPill(value) {
    if (!tagsContainer || !tagInput) return;
    const pill = document.createElement("div");
    pill.className = "tag-pill";
    pill.innerHTML = `${value} <i data-lucide="x" class="remove-tag"></i>`;
    pill.querySelector(".remove-tag").addEventListener("click", () => pill.remove());
    tagsContainer.insertBefore(pill, tagInput);
    refreshIcons();
  }

  if (tagInput && tagsContainer) {
    tagInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const value = tagInput.value.trim();
        if (value) {
          addTagPill(value);
          tagInput.value = "";
        }
      }
    });
  }

  // -----------------------------------------------------
  // 8. FILE DRAG & DROP & PREVIEW
  // -----------------------------------------------------
  const bannerFileInput = document.getElementById("bannerFileInput");
  const bannerDropzone = document.getElementById("bannerDropzone");
  const imagePreviewBox = document.getElementById("imagePreviewBox");
  const bannerImgPreview = document.getElementById("bannerImgPreview");
  const removeImgBtn = document.getElementById("removeImgBtn");

  if (bannerFileInput && bannerDropzone) {
    bannerDropzone.addEventListener("click", () => bannerFileInput.click());

    bannerDropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      bannerDropzone.classList.add("dragover");
    });

    bannerDropzone.addEventListener("dragleave", () => bannerDropzone.classList.remove("dragover"));

    bannerDropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      bannerDropzone.classList.remove("dragover");
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        bannerFileInput.files = e.dataTransfer.files;
        handleImagePreview(e.dataTransfer.files[0]);
      }
    });

    bannerFileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        handleImagePreview(e.target.files[0]);
      }
    });
  }

  function handleImagePreview(fileOrUrl) {
    if (!bannerImgPreview || !imagePreviewBox || !bannerDropzone) return;
    
    if (typeof fileOrUrl === "string") {
      bannerImgPreview.src = fileOrUrl;
      imagePreviewBox.classList.remove("hidden");
      bannerDropzone.classList.add("hidden");
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        bannerImgPreview.src = e.target.result;
        imagePreviewBox.classList.remove("hidden");
        bannerDropzone.classList.add("hidden");
      };
      reader.readAsDataURL(fileOrUrl);
    }
  }

  if (removeImgBtn) {
    removeImgBtn.addEventListener("click", () => {
      if (bannerFileInput) bannerFileInput.value = "";
      if (bannerImgPreview) bannerImgPreview.src = "";
      if (imagePreviewBox) imagePreviewBox.classList.add("hidden");
      if (bannerDropzone) bannerDropzone.classList.remove("hidden");
    });
  }

  // -----------------------------------------------------
  // 9. API INTEGRATIONS: GET, POST, PUT, DELETE /events
  // -----------------------------------------------------

  // Reset event form state (Creation vs Edit)
  function resetEventForm() {
    currentEditingEventId = null;
    const form = document.getElementById("createEventForm");
    if (form) form.reset();

    // Clear tag pills
    if (tagsContainer) {
      document.querySelectorAll(".tag-pill").forEach((pill) => pill.remove());
    }

    // Reset Image preview
    if (removeImgBtn) removeImgBtn.click();

    // Reset steps back to 1
    goToStep(1);

    // Reset submit button text
    const submitBtn = form?.querySelector("button[type='submit']");
    if (submitBtn) submitBtn.textContent = "Publish Event";
  }

  // A. FETCH ALL EVENTS (GET /events)
  async function fetchEvents() {
    const eventsContainer = document.getElementById("eventsContainer") || document.getElementById("myEventsContainer");
    if (!eventsContainer) return;

    try {
      eventsContainer.innerHTML = "<p>Loading events...</p>";

      const response = await fetch(`${API_URL}/events`, {
        method: "GET",
        headers: getAuthHeaders(true),
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch events (${response.status})`);
      }

      const events = await response.json();
      const eventList = Array.isArray(events) ? events : events.data || [];

      renderEventsList(eventList, eventsContainer);
    } catch (error) {
      console.error("Fetch Events Error:", error);
      eventsContainer.innerHTML = "<p>Error loading events. Please try again later.</p>";
    }
  }

  // Render cards in the UI
  function renderEventsList(events, container) {
    if (!events || events.length === 0) {
      container.innerHTML = "<p>No events found.</p>";
      return;
    }

    container.innerHTML = events.map((event) => {
      const id = event._id || event.id;
      const title = event.title || "Untitled Event";
      const date = event.startDateTime ? new Date(event.startDateTime).toLocaleDateString() : "TBA";
      const venue = event.venue || "TBD";
      const banner = event.banner || event.bannerUrl || "https://via.placeholder.com/300x150";

      return `
        <div class="event-card" data-id="${id}">
          <img src="${banner}" alt="${title}" class="event-card-banner" />
          <div class="event-card-body">
            <h3>${title}</h3>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Venue:</strong> ${venue}</p>
            <div class="event-card-actions">
              <button class="btn btn-secondary view-event-btn" data-id="${id}">View</button>
              <button class="btn btn-primary edit-event-btn" data-id="${id}">Edit</button>
              <button class="btn btn-danger delete-event-btn" data-id="${id}">Delete</button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    refreshIcons();

    // Attach Action Listeners
    container.querySelectorAll(".view-event-btn").forEach((btn) => {
      btn.addEventListener("click", () => getEventById(btn.getAttribute("data-id")));
    });

    container.querySelectorAll(".edit-event-btn").forEach((btn) => {
      btn.addEventListener("click", () => populateFormForEdit(btn.getAttribute("data-id")));
    });

    container.querySelectorAll(".delete-event-btn").forEach((btn) => {
      btn.addEventListener("click", () => deleteEvent(btn.getAttribute("data-id")));
    });
  }

  // B. GET SINGLE EVENT BY ID (GET /events/:id)
  async function getEventById(eventId) {
    try {
      showToast("Fetching event details...", "info");
      const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: "GET",
        headers: getAuthHeaders(true),
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Failed to fetch event details");
      }

      const eventData = await response.json();
      const event = eventData.event || eventData;

      showToast(`Loaded: ${event.title}`, "info");
      return event;
    } catch (error) {
      console.error("Get Event Error:", error);
      showToast("Error getting event details", "error");
    }
  }

  // C. PRE-POPULATE FORM FOR UPDATE (PUT)
  async function populateFormForEdit(eventId) {
    const event = await getEventById(eventId);
    if (!event) return;

    currentEditingEventId = event._id || event.id;

    // Switch to creation page/tab
    switchPage("create-event");

    // Populate inputs
    if (document.getElementById("inputTitle")) document.getElementById("inputTitle").value = event.title || "";
    if (document.getElementById("inputCategory")) document.getElementById("inputCategory").value = event.category || "";
    if (document.getElementById("inputAudience")) document.getElementById("inputAudience").value = event.targetAudience || "";
    if (document.getElementById("inputTagline")) document.getElementById("inputTagline").value = event.tagline || "";
    if (document.getElementById("inputStartDateTime")) document.getElementById("inputStartDateTime").value = event.startDateTime ? event.startDateTime.slice(0, 16) : "";
    if (document.getElementById("inputEndDateTime")) document.getElementById("inputEndDateTime").value = event.endDateTime ? event.endDateTime.slice(0, 16) : "";
    if (document.getElementById("inputVenue")) document.getElementById("inputVenue").value = event.venue || "";
    if (document.getElementById("inputDescription")) document.getElementById("inputDescription").value = event.description || "";
    if (document.getElementById("inputCapacity")) document.getElementById("inputCapacity").value = event.capacity || 0;
    if (document.getElementById("inputMinTeam")) document.getElementById("inputMinTeam").value = event.minTeam || 1;
    if (document.getElementById("inputMaxTeam")) document.getElementById("inputMaxTeam").value = event.maxTeam || 1;
    if (document.getElementById("inputRules")) document.getElementById("inputRules").value = event.rules || "";
    if (document.getElementById("inputContact")) document.getElementById("inputContact").value = event.contactEmail || "";

    // Clear and populate tags
    if (tagsContainer) {
      document.querySelectorAll(".tag-pill").forEach((p) => p.remove());
      const tags = Array.isArray(event.tags) ? event.tags : JSON.parse(event.tags || "[]");
      tags.forEach((tag) => addTagPill(tag));
    }

    // Banner Preview
    if (event.banner || event.bannerUrl) {
      handleImagePreview(event.banner || event.bannerUrl);
    }

    // Submit button label
    const submitBtn = document.querySelector("#createEventForm button[type='submit']");
    if (submitBtn) submitBtn.textContent = "Update Event";
  }

  // D. CREATE / UPDATE EVENT SUBMISSION (POST /events OR PUT /events/:id)
  const createEventForm = document.getElementById("createEventForm");
  const successModal = document.getElementById("successModal");
  const closeModalBtn = document.getElementById("closeModalBtn");

  if (createEventForm) {
    createEventForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const activeMode = document.querySelector("#eventTypeToggle .toggle-btn.active")?.getAttribute("data-type") || "On-Campus";
      const activeFormat = document.querySelector("#teamTypeToggle .toggle-btn.active")?.getAttribute("data-format") || "Team";

      const tags = Array.from(document.querySelectorAll(".tag-pill")).map((pill) =>
        pill.textContent.trim()
      );

      const formData = new FormData();
      formData.append("title", document.getElementById("inputTitle")?.value || "");
      formData.append("category", document.getElementById("inputCategory")?.value || "");
      formData.append("targetAudience", document.getElementById("inputAudience")?.value || "");
      formData.append("tagline", document.getElementById("inputTagline")?.value || "");
      formData.append("tags", JSON.stringify(tags));
      formData.append("startDateTime", document.getElementById("inputStartDateTime")?.value || "");
      formData.append("endDateTime", document.getElementById("inputEndDateTime")?.value || "");
      formData.append("eventMode", activeMode);
      formData.append("venue", document.getElementById("inputVenue")?.value || "");
      formData.append("description", document.getElementById("inputDescription")?.value || "");
      formData.append("format", activeFormat);
      formData.append("capacity", document.getElementById("inputCapacity")?.value || 0);
      formData.append("minTeam", document.getElementById("inputMinTeam")?.value || 1);
      formData.append("maxTeam", document.getElementById("inputMaxTeam")?.value || 1);
      formData.append("rules", document.getElementById("inputRules")?.value || "");
      formData.append("contactEmail", document.getElementById("inputContact")?.value || "");

      if (bannerFileInput && bannerFileInput.files[0]) {
        formData.append("banner", bannerFileInput.files[0]);
      }

      const isEditing = Boolean(currentEditingEventId);
      const endpoint = isEditing
        ? `${API_URL}/events/${currentEditingEventId}`
        : `${API_URL}/events`;
      const method = isEditing ? "PUT" : "POST";

      try {
        showToast(isEditing ? "Updating event..." : "Publishing event...", "info");

        const response = await fetch(endpoint, {
          method: method,
          headers: getAuthHeaders(false), // FormData sets its own Content-Type boundary
          credentials: "include",
          body: formData
        });

        if (response.ok) {
          if (successModal) successModal.classList.remove("hidden");
          resetEventForm();
        } else {
          const errData = await response.json().catch(() => ({}));
          showToast(errData.message || "Failed to save event.", "error");
        }
      } catch (error) {
        console.error("Event save error:", error);
        showToast("An error occurred while saving the event.", "error");
      }
    });
  }

  // E. DELETE EVENT (DELETE /events/:id)
  async function deleteEvent(eventId) {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      showToast("Deleting event...", "info");

      const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
        headers: getAuthHeaders(true),
        credentials: "include"
      });

      if (response.ok) {
        showToast("Event deleted successfully", "info");
        fetchEvents(); // Refresh UI list
      } else {
        const errData = await response.json().catch(() => ({}));
        showToast(errData.message || "Failed to delete event", "error");
      }
    } catch (error) {
      console.error("Delete Event Error:", error);
      showToast("Error occurred while deleting event", "error");
    }
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      if (successModal) successModal.classList.add("hidden");
      switchPage("my-events");
    });
  }

  // Initial load of events when dom loads
  fetchEvents();
});