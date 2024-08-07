const pages = document.querySelectorAll('.page');
let currentPageIndex = 0;

function showPage(index) {
  pages[currentPageIndex].style.display = 'none';
  pages[index].style.display = 'block';
  currentPageIndex = index;
}

function nextPage() {
  if (currentPageIndex < pages.length - 1) {
    showPage(currentPageIndex + 1);
  }
}

function prevPage() {
  if (currentPageIndex > 0) {
    showPage(currentPageIndex - 1);
  }
}

showPage(0);

function toggleResumeForm() {
    const resumeLink = document.getElementById("resumeLink");
    const resumeForm = document.getElementById("resumeForm");
    if (resumeLink.style.display === "none") {
        resumeLink.style.display = "inline";
        resumeForm.style.display = "none";
    } else {
        resumeLink.style.display = "none";
        resumeForm.style.display = "block";
    }
}

let selectedProfiles = 0;

function showNextForm() {
    selectedProfiles = document.querySelector('input[name="numProfiles"]:checked').value;

    // Show the appropriate next form based on selectedProfiles
    if (selectedProfiles === '1') {
        showForm('parentGuardianForm1');
    } else if (selectedProfiles === '2') {
        showForm('parentGuardianForm2');
    } else if (selectedProfiles === '3') {
        showForm('parentGuardianForm3');
    }
}




    function showForm(formId) {
        // Hide all forms
        const forms = document.querySelectorAll('.parent-guardian-form');
        forms.forEach(form => {
            form.style.display = 'none';
        });

        // Show the selected form
        const selectedForm = document.getElementById(formId);
        selectedForm.style.display = 'block';
    }


  
// JavaScript to handle conditional display and form submission

function showChildrenDetails() {
  const childrenDetailsSection = document.getElementById('childrenDetails');
  const childrenEnrolled = document.querySelector('input[name="childrenEnrolled"]:checked').value;

  if (childrenEnrolled === 'yes') {
    childrenDetailsSection.style.display = 'block';
  } else {
    childrenDetailsSection.style.display = 'none';
  }
}


function showChildForm(childNumber) {
  // Hide all child forms
  var childForms = document.querySelectorAll('.childForm');
  childForms.forEach(function(form) {
      form.style.display = 'none';
  });

  // Show the selected child form
  document.getElementById('childForm' + childNumber).style.display = 'block';
}

document.querySelector('input[name="childrenEnrolled"]').addEventListener('change', function() {
  if (this.value === 'yes') {
      showChildrenDetails();
  } else if (this.value === 'no') {
      showEnrolChildren();
  }
});

document.querySelector('input[name="numChildren"]').addEventListener('change', function() {
  var numChildren = parseInt(this.value);

  // Show child forms based on the selected number
  for (var i = 1; i <= 3; i++) {
      if (i <= numChildren) {
          showChildForm(i);
      }
  }
});




//forms validation 
// Get references to the form and relevant input fields
const parentGuardianForm = document.getElementById("parentGuardianForm1");
const firstNameInput = parentGuardianForm.querySelector('input[name="firstName"]');
const emailInput = parentGuardianForm.querySelector('input[name="email"]');
const primaryPhoneInput = parentGuardianForm.querySelector('input[name="primaryPhone"]');

// Function to validate the form
function validateForm() {
  let isValid = true;

  // Validate First Name (required)
  if (firstNameInput.value.trim() === "") {
    isValid = false;
    alert("First Name is required.");
  }

  // Validate Email (required and valid email format)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === "") {
    isValid = false;
    alert("Email is required.");
  } else if (!emailRegex.test(emailInput.value.trim())) {
    isValid = false;
    alert("Please enter a valid email address.");
  }

  // Validate Primary Phone (required)
  if (primaryPhoneInput.value.trim() === "") {
    isValid = false;
    alert("Primary Phone Number is required.");
  }

  return isValid;
}

// Function to handle form submission
function submitForm() {
  if (validateForm()) {
    // Perform form submission actions here
    alert("Form submitted successfully!");
  }
}

// Attach submitForm function to form submit event
parentGuardianForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent actual form submission
  submitForm();
});



// Function to validate a single input field
function validateInput(inputElement, errorMessage) {
  if (inputElement.value.trim() === "") {
    showError(inputElement, errorMessage);
    return false;
  }
  return true;
}

// Function to show error message for a specific input
function showError(inputElement, errorMessage) {
  const errorContainer = inputElement.nextElementSibling;
  errorContainer.textContent = errorMessage;
  inputElement.classList.add("error");
}

// Function to clear error message for a specific input
function clearError(inputElement) {
  const errorContainer = inputElement.nextElementSibling;
  errorContainer.textContent = "";
  inputElement.classList.remove("error");
}

// Function to validate the entire form
function validateForm(form) {
  let isValid = true;

  // Validate text inputs
  isValid &= validateInput(form.firstName, "First Name is required.");
  isValid &= validateInput(form.lastName, "Last Name is required.");
  isValid &= validateInput(form.email, "Email is required.");
  isValid &= validateInput(form.primaryPhone, "Primary Phone Number is required.");
  isValid &= validateInput(form.addressLine1, "Address Line 1 is required.");

  // Validate character count for address
  if (form.addressLine1.value.length > 100) {
    showError(form.addressLine1, "Address cannot exceed 100 characters.");
    isValid = false;
  }

  // Validate radio buttons
  if (!form.childrenEnrolledYes.checked && !form.childrenEnrolledNo.checked) {
    showError(form.childrenEnrolledYes, "Please select an option.");
    isValid = false;
  }

  // Validate checkbox
  if (!form.agreeTerms.checked) {
    showError(form.agreeTerms, "You must agree to the terms.");
    isValid = false;
  }

  return isValid;
}

// Function to handle form submission
function submitForm(form) {
  if (validateForm(form)) {
    // Perform form submission actions here
    alert("Form submitted successfully!");
  }
}

// Attach submitForm function to form submit event

parentGuardianForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent actual form submission
  submitForm(parentGuardianForm);
});



// Attach the updated navigation functions to your buttons
// Attach the updated navigation functions to your buttons
const nextButtons = document.querySelectorAll('.next-button');
nextButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const nextPageIndex = currentPageIndex + 1;
    if (nextPageIndex < pages.length) {
      if (validateCurrentForm()) {
        goToPage(nextPageIndex);
      } else {
        alert('Please fill out all required fields before proceeding.');
      }
    }
  });
});

function validateCurrentForm() {
  const currentPage = pages[currentPageIndex];
  const isFormRequired = currentPage.getAttribute('data-form-required');

  if (isFormRequired === 'true') {
    const form = currentPage.querySelector('form');
    if (form && !isFormValid(form)) {
      return false;
    }
  }

  return true;
}


function isFormValid(form) {
  const requiredInputs = form.querySelectorAll('[required]');
  for (const input of requiredInputs) {
      if (!input.value.trim()) {
          return false;
      }
  }
  return true;
}




// Function to navigate to a specific page
function goToPage(index) {
  const currentPage = pages[currentPageIndex];
  const nextPage = pages[index];

  const isFormRequired = currentPage.getAttribute('data-form-required');

  if (isFormRequired === 'true') {
    const form = currentPage.querySelector('form');
    if (form && !isFormValid(form)) {
      alert('Please fill out all required fields before proceeding.');
      return;
    }
  }

  currentPage.style.display = 'none';
  nextPage.style.display = 'block';
  currentPageIndex = index;
}



// Form One - Resume Later
const resumeForm = document.getElementById('resumeForm');
resumeForm.addEventListener('submit', function (event) {
    const email = document.getElementById('resumeEmail');
    const password = document.getElementById('resumePassword');

    if (!email.value.trim() || !password.value.trim()) {
        event.preventDefault();
        alert('Please fill out all required fields.');
    }
});

// Form Two - Identity Check
const identityForm = document.getElementById('identityForm');
identityForm.addEventListener('submit', function (event) {
    const email = document.getElementById('identityEmail');
    const password = document.getElementById('identityPassword');

    if (!email.value.trim() || !password.value.trim()) {
        event.preventDefault();
        alert('Please fill out all required fields.');
    }
});

// Form Three - Contact Form
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function (event) {
    const requiredInputs = contactForm.querySelectorAll('[required]');
    for (const input of requiredInputs) {
        if (!input.value.trim()) {
            event.preventDefault();
            alert('Please fill out all required fields.');
            break;
        }
    }
});

// Form Four - Children Enrollment
const childrenEnrollmentForm = document.querySelector('.contact-form');
childrenEnrollmentForm.addEventListener('submit', function (event) {
    const childrenEnrolled = document.querySelector('input[name="childrenEnrolled"]:checked');
    if (!childrenEnrolled) {
        event.preventDefault();
        alert('Please indicate whether you have children enrolled or not.');
    }
});



// Attach the updated navigation functions to your buttons
const nextButton = document.querySelector("#nextButton");
nextButton.addEventListener("click", function () {
  if (currentPageIndex < pages.length - 1) {
    if (isFormValid(pages[currentPageIndex])) {
      goToPage(currentPageIndex + 1);
    } else {
      alert('Please fill out all required fields before proceeding.');
    }
  }
});

const prevButton = document.querySelector("#prevButton");
prevButton.addEventListener("click", function () {
  if (currentPageIndex > 0) {
    goToPage(currentPageIndex - 1);
  }
});


// Assuming you have a function to submit the form
async function submitForm(formData, token) {
  try {
    const response = await fetch('/auth/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Your JWT token
      },
      body: JSON.stringify({ formData }),
    });

    if (response.ok) {
      // Display thank you message
      displayThankYouMessage();
    } else {
      console.error('Form submission failed.');
    }
  } catch (error) {
    console.error(error);
  }
}

function displayThankYouMessage() {
  // Assuming you have a thank you message element in your HTML
  const thankYouMessageElement = document.getElementById('thankYouMessage');
  
  // Display the thank you message
  thankYouMessageElement.innerText = 'Thank you for submitting the form!';
}


const submitFormButton = document.getElementById('submitFormButton');
submitFormButton.addEventListener('click', async () => {
  // Assuming you have a function to gather form data
  const formData = gatherFormData();
  
  // Get the JWT token from your HTML or wherever it's stored
  const token = '0a6f86a904ee1c49cd748edeb073f0266de1ee8e8ce4abaf1cd0b09c91b9f8cc';

  // Call the submitForm function
  await submitForm(formData, token);
});



