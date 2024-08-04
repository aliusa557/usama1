// script.js

// Function to open WhatsApp when clicking the "Let's Chat" button
function openWhatsApp() {
  // Replace "phone_number" with the actual phone number you want to open in WhatsApp.
  // Remember to include the country code without '+' or '0', e.g., "923001234567".
  const phoneNumber = "phone_number";

  // Construct the WhatsApp URL
  const whatsappURL = `https://api.whatsapp.com/send?phone=${923257316315}&text=Hello! I'd like to chat.`;

  // Open the WhatsApp URL in a new tab
  window.open(whatsappURL, "_blank");
}

// Function to send an email when clicking the "Let's Chat" button
function sendEmail() {
  // Replace "your_email_address" with your email address.
  const emailAddress = "rayusamajaat@gmail.com";

  // Replace "Chat Request" with the subject of the email.
  const emailSubject = "Chat Request";

  // Replace "Hello! I'd like to chat." with the email message.
  const emailMessage = "Hello! I'd like to chat.";

  // Construct the email URL
  const emailURL = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailMessage)}`;

  // Open the email URL
  window.location.href = emailURL;
}

// Function to handle the CV download
function downloadCV() {
  // Replace "cv_file_path.pdf" with the actual path to your CV file.
  // You can use a direct link to the file or use a relative path to the file from the HTML file location.
  const cvFilePath = "https://github.com/aliusa557/usama/raw/main/CV.UsamaMehboob.pdf";

  // Create an anchor element to trigger the download
  const anchor = document.createElement("a");
  anchor.href = cvFilePath;
  anchor.download = "CV.UsamaMehboob.pdf"; // Change the name of the downloaded CV file
  anchor.click();
}



// Function to handle the "Hire Me" button click
function handleHireMe() {
  // Replace "your_email_address" with your email address.
  const emailAddress = "rayusamajaat@gmail";

  // Replace "Hiring Request" with the subject of the email.
  const emailSubject = "Hiring Request";

  // Replace "Hello! I'd like to hire you." with the email message.
  const emailMessage = "Hello! I'd like to hire you.";

  // Construct the email URL
  const emailURL = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailMessage)}`;

  // Open the email URL
  window.location.href = emailURL;
}

// Add event listeners to the buttons
document.addEventListener("DOMContentLoaded", function () {
  const letsChatButton = document.querySelector(".contact .button button");
  const downloadCVButton = document.querySelector(".about .button button");
  const hireMeButton = document.querySelector(".home .button button");

  if (letsChatButton) {
    letsChatButton.addEventListener("click", function () {
      // Prompt the user to choose between WhatsApp and Email
      const chatMethod = prompt("Choose a chat method: 1. WhatsApp 2. Email");
      if (chatMethod === "1") {
        openWhatsApp();
      } else if (chatMethod === "2") {
        sendEmail();
      } else {
        alert("Invalid choice. Please choose either 1 or 2.");
      }
    });
  }

  if (downloadCVButton) {
    downloadCVButton.addEventListener("click", downloadCV);
  }

  if (hireMeButton) {
    hireMeButton.addEventListener("click", handleHireMe);
  }
});
