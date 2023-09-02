//admission
 // Add a DOMContentLoaded event listener to center the text initially
 document.addEventListener("DOMContentLoaded", function() {
  var imageText = document.querySelector(".image-text");
  var imageAdmission = document.querySelector(".image-admission");
  var imageHeight = imageAdmission.offsetHeight;
  var textHeight = imageText.offsetHeight;
  imageText.style.bottom = (imageHeight - textHeight) / 2 + "px";
});

// Add a scroll event listener to move the text to the bottom when scrolling
window.addEventListener("scroll", function() {
  var imageText = document.querySelector(".image-text");
  var imageAdmission = document.querySelector(".image-admission");
  var imageHeight = imageAdmission.offsetHeight;
  var textHeight = imageText.offsetHeight;
  var scrollPosition = window.scrollY;
  
  // Check if the scroll position is greater than the height of the image
  if (scrollPosition > window.innerHeight) {
    // If yes, set the bottom position to 20px
    imageText.style.bottom = "20px";
  } else {
    // If not, set the bottom position based on the scroll position
    imageText.style.bottom = (imageHeight - textHeight) / 2 - scrollPosition / 2 + "px";
  }
});



// Section styles
const expandButtons = document.querySelectorAll(".expand");

expandButtons.forEach(button => {
  button.addEventListener("click", () => {
    const content = button.parentElement.nextElementSibling;
    if (content.style.display === "none" || content.style.display === "") {
      content.style.display = "block";
      button.textContent = "-";
    } else {
      content.style.display = "none";
      button.textContent = "+";
    }
  });
});

