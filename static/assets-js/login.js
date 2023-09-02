// // Function to validate the login form
// function validateForm() {
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   const errorMessage = document.getElementById('error-message');

//   if (!email && !password) {
//       errorMessage.style.display = 'none'; // Hide the error message
//   } else if (!email || !password) {
//       errorMessage.style.display = 'block'; // Display the error message
//   } else {
//       errorMessage.style.display = 'none'; // Hide the error message
//       // Uncomment the following line to submit the form (replace '#' with your form action URL)
//       // document.getElementById('login-form').action = '#';
//       // document.getElementById('login-form').submit();
//   }
// }

// // Add event listener to the login button
// document.getElementById('loginBtn').addEventListener('click', function () {
//   // If both fields are empty, display the error message
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   const errorMessage = document.getElementById('error-message');

//   if (!email && !password) {
//       errorMessage.style.display = 'block';
//   } else {
//       validateForm();
//   }
// });

// Function to validate the login form
function validateForm() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  if (!email && !password) {
    errorMessage.style.display = 'none'; // Hide the error message
  } else if (!email || !password) {
    errorMessage.style.display = 'block'; // Display the error message
  } else {
    errorMessage.style.display = 'none'; // Hide the error message

    // Create an object with the login data
    const loginData = {
      email: email,
      password: password
    };

    // Send login request to the backend
    fetch('/project/routes/auth.js', {
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
        window.location.href = '/dashboard.html'; // Replace with your desired destination
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

// Add event listener to the login button
document.getElementById('loginBtn').addEventListener('click', function () {
  validateForm();
});



function forgotPassword() {
  const forgotPopup = document.getElementById('forgotPopup');
  const closeBtn = document.getElementById('closeBtn');
  const sendBtn = document.getElementById('sendBtn');
  const forgotForm = document.getElementById('forgot-form');

  // Show the forgot password pop-up window
  forgotPopup.style.display = 'block';

  // Close the pop-up window when the close button is clicked
  closeBtn.onclick = function () {
    forgotPopup.style.display = 'none';
  };

  // Send the reset email (or perform other forgot password actions) when the Send button is clicked
  sendBtn.onclick = function () {
    const forgotEmail = document.getElementById('forgotEmail').value;
    // Add your code here to send the reset email or perform other forgot password actions
    alert(`Reset email sent to: ${forgotEmail}`);
    forgotPopup.style.display = 'none'; // Close the pop-up window after sending the reset email
  };

  // Prevent form submission (optional, you can remove this if you want the form to submit normally)
  forgotForm.onsubmit = function () {
    return false;
  };
}


// Function to toggle the display of the popup
function togglePopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
}

// Send Reset Email Function
function sendResetEmail() {
  const forgotEmail = document.getElementById('forgotEmail').value;
  // Add your code here to send the reset email
  alert(`Reset email sent to: ${forgotEmail}`);
  closePopup('forgotPopup');
  return false;
}

// Close Popup Window
function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.style.display = 'none';
}

// Add event listeners
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


