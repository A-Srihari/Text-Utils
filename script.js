// Global state management
let currentMode = "light";
let currentText = "";

// DOM elements
const textArea = document.getElementById("textArea");
const navbar = document.getElementById("navbar");
const modeToggle = document.getElementById("switchCheckDefault");
const modeLabel = document.getElementById("mode-btn");
const alertContainer = document.getElementById("alertContainer");
const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");
const readTime = document.getElementById("readTime");
const textPreview = document.getElementById("textPreview");

// Button elements
const uppercaseBtn = document.getElementById("uppercaseBtn");
const lowercaseBtn = document.getElementById("lowercaseBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const removeSpacesBtn = document.getElementById("removeSpacesBtn");

// Utility Functions
function capitalize(word) {
  const lower = word.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function showAlert(message, type) {
  // Remove existing alert
  alertContainer.innerHTML = "";

  // Create new alert
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.setAttribute("role", "alert");
  alertDiv.innerHTML = `
                <strong>${capitalize(type)}</strong> : ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;

  alertContainer.appendChild(alertDiv);

  // Auto remove after 2.5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 2500);
}

function updateTextStats() {
  const text = textArea.value;
  currentText = text;

  // Count words (filter out empty strings)
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const wordCountNum = text.trim() === "" ? 0 : words.length;

  // Update display
  wordCount.textContent = `Your text has ${wordCountNum} words.`;
  charCount.textContent = `Your text has ${text.length} characters.`;
  readTime.textContent = `Time takes to read: ${(
    wordCountNum *
    0.008 *
    60
  ).toFixed(2)} seconds`;

  // Update preview
  textPreview.textContent =
    text === "" ? "Enter your text in text area to preview it here" : text;
}

function toggleMode() {
  if (currentMode === "light") {
    currentMode = "dark";
    document.body.style.backgroundColor = "#1a1c21";
    document.body.style.color = "white";

    // Update navbar
    navbar.className =
      "navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-2 border-light";

    // Update textarea
    textArea.style.backgroundColor = "#282c34";
    textArea.style.color = "white";
    textArea.style.borderColor = "#495057";

    // Update mode label
    modeLabel.style.color = "white";

    showAlert("Dark mode has been enabled", "success");
  } else {
    currentMode = "light";
    document.body.style.backgroundColor = "white";
    document.body.style.color = "#282c34";

    // Update navbar
    navbar.className =
      "navbar navbar-expand-lg navbar-light bg-light border-bottom border-2 border-dark";

    // Update textarea
    textArea.style.backgroundColor = "white";
    textArea.style.color = "#282c34";
    textArea.style.borderColor = "#ced4da";

    // Update mode label
    modeLabel.style.color = "#282c34";

    showAlert("Light mode has been enabled", "success");
  }
}

// Text manipulation functions
function handleUppercase() {
  if (currentText.length === 0) {
    showAlert("Please enter text to convert it to uppercase", "warning");
    return;
  }
  textArea.value = currentText.toUpperCase();
  updateTextStats();
  showAlert("Text has been converted to uppercase", "success");
}

function handleLowercase() {
  if (currentText.length === 0) {
    showAlert("Please enter text to convert it to lowercase", "warning");
    return;
  }
  textArea.value = currentText.toLowerCase();
  updateTextStats();
  showAlert("Text has been converted to lowercase", "success");
}

function handleCopy() {
  if (currentText.length === 0) {
    showAlert("Please enter text to copy it", "warning");
    return;
  }
  navigator.clipboard
    .writeText(currentText)
    .then(() => {
      showAlert("Text has been copied to clipboard", "success");
    })
    .catch(() => {
      // Fallback for older browsers
      textArea.select();
      document.execCommand("copy");
      showAlert("Text has been copied to clipboard", "success");
    });
}

function handleClear() {
  if (currentText.length === 0) {
    showAlert("Please enter text to clear it", "warning");
    return;
  }
  textArea.value = "";
  updateTextStats();
  showAlert("Text has been cleared", "success");
}

function handleRemoveSpaces() {
  if (currentText.length === 0) {
    showAlert("Please enter text to remove extra spaces", "warning");
    return;
  }
  const newText = currentText.split(/[ ]+/).join(" ");
  textArea.value = newText;
  updateTextStats();
  showAlert("Extra spaces have been removed", "success");
}

// Event Listeners
textArea.addEventListener("input", updateTextStats);
modeToggle.addEventListener("change", toggleMode);
uppercaseBtn.addEventListener("click", handleUppercase);
lowercaseBtn.addEventListener("click", handleLowercase);
copyBtn.addEventListener("click", handleCopy);
clearBtn.addEventListener("click", handleClear);
removeSpacesBtn.addEventListener("click", handleRemoveSpaces);

// Initialize
updateTextStats();
