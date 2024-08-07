// Function to validate the registration form
function validateRegistrationForm() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const email = document.getElementById('email').value;
  const errorMessage = document.getElementById('error-message');

  if (!username || !password || !confirmPassword || !email) {
    errorMessage.textContent = 'Please fill out all fields.';
    errorMessage.style.display = 'block';
  } else if (password !== confirmPassword) {
    errorMessage.textContent = 'Passwords do not match.';
    errorMessage.style.display = 'block';
  } else {
    errorMessage.style.display = 'none';

    // Create an object with the registration data
    const registrationData = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
      email: email,
    };

    // Send registration request to the backend
    fetch('/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => response.json())
      .then((data) => {
          if (data.success) {
              // Registration successful, you can redirect the user if needed
              alert('Registration successful!');
          } else {
              // Display error message to the user
              errorMessage.textContent = data.message; // Display the error message from the server
              errorMessage.style.display = 'block';
          }
      })
      .catch((error) => {
        errorMessage.textContent =
          'An error occurred while creating an account. Please try again.';
        errorMessage.style.display = 'block';
      });
  }
}

// Add event listener to the registration form submission
document.getElementById('registrationForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission
  validateRegistrationForm();
});
