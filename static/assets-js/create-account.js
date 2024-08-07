function validateForm() {
    const email = document.getElementById('email').value;
    const retypeEmail = document.getElementById('retypeEmail').value;
    const password = document.getElementById('password').value;
    const retypePassword = document.getElementById('retypePassword').value;
    const errorMessage = document.getElementById('error-message');

    if (!email || !retypeEmail || !password || !retypePassword) {
      errorMessage.style.display = 'block';
      return false;
    } else if (email !== retypeEmail || password !== retypePassword) {
      errorMessage.innerText = "Email and Retype Email, Password and Retype Password must match.";
      errorMessage.style.display = 'block';
      return false;
    } else {
      errorMessage.style.display = 'none';
      // Uncomment the following lines to submit the form (replace '#' with your form action URLs)
      document.getElementById('register-form').action = '/auth/register';
      document.getElementById('register-form').submit();
      return true;
    }
  }

// Function to handle the create account form submission
document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);

  // Send registration request to backend
  fetch('/auth/register', {
    method: 'POST',
    body: formData
})
  .then(response => response.json())
  .then(data => {
      // Handle registration success
      if (data.message) {
          // Display success message to the user (e.g., show a modal)
          alert(data.message);
          // Redirect the user to the login page or another appropriate destination
          window.location.href = '/login.html'; // Replace with your desired destination
      }
  })
  .catch(error => {
    // Handle registration failure
    console.error(error);

    // Display an error message to the user
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = 'An error occurred while creating an account. Please try again later.';
    errorMessage.style.display = 'block';
});

});
