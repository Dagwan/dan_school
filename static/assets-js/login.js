// Function to validate the login form
function validateForm() {
  const username = document.getElementById('username').value; 
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  if (!username || !password) {
    errorMessage.style.display = 'block'; // Display the error message
  } else {
    errorMessage.style.display = 'none'; // Hide the error message

    // Create an object with the login data
    const loginData = {
      username: username,
      password: password
    };

    // Send login request to the backend (replace with your actual route)
    fetch('/login', { // Correct the fetch syntax
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        // Store the token securely (e.g., in cookies or local storage)
        // Redirect the user to the dashboard or another page
        window.location.href = '/application.html'; // Replace with your desired destination
      } else {
        // Display error message to the user
        errorMessage.style.display = 'block';
      }
    })
    .catch(error => {
      console.error(error);
      errorMessage.style.display = 'block';
    });
  }
}

// Function to toggle the display of the popup
function togglePopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

// Send Reset Email Function
function sendResetEmail() {
  const forgotEmail = document.getElementById('forgotEmail').value;
  const errorMessage = document.getElementById('error-message');

  if (!forgotEmail) {
      errorMessage.style.display = 'block'; // Display an error message
  } else {
      errorMessage.style.display = 'none'; // Hide the error message

      // Create an object with the email data
      const emailData = {
          email: forgotEmail
      };

      // Send a POST request to the new Flask route (replace with your actual route)
      fetch('/send_reset_email', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
            console.log(data); // Log response content to the console
              alert('Reset password sent successfully!');
              closePopup('forgotPopup');
          } else {
              errorMessage.style.display = 'block';
              alert('Error sending reset password. Please try again.');
          }
      })
      .catch(error => {
          console.error(error);
          errorMessage.style.display = 'block';
          alert('Error sending reset email. Please try again.');
      });
  }
}


// Close Popup Window
function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.style.display = 'none';
}

// Add event listeners using functions
document.getElementById('loginButton').addEventListener('click', function () {
  validateForm();
});


document.getElementById('forgotPasswordBtn').addEventListener('click', function (event) {
  event.preventDefault();
  togglePopup('forgotPopup');
});

document.getElementById('cancelForgotBtn').addEventListener('click', function (event) {
  event.preventDefault();
  closePopup('forgotPopup');
});

document.getElementById('sendResetBtn').addEventListener('click', function (event) {
  event.preventDefault();
  sendResetEmail();
});


//show password 
document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const showPasswordCheckbox = document.getElementById("showPassword");

  showPasswordCheckbox.addEventListener("change", function () {
    if (showPasswordCheckbox.checked) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });
});
 