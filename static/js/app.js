// JavaScript to toggle the mobile menu
const menuIcon = document.querySelector('.menu-icon');
const menuList = document.querySelector('.menu-list');

menuIcon.addEventListener('click', () => {
  menuList.classList.toggle('show');
});

// Add hover effect to the hamburger icon
menuIcon.addEventListener('mouseover', () => {
  menuIcon.classList.add('hover');
});

menuIcon.addEventListener('mouseout', () => {
  menuIcon.classList.remove('hover');
});
  


// FOR FOOTER Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
  // Get the current date and update the footer
  function updateFooterDate() {
    const footerDate = document.querySelector('.copy-date');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const day = currentDate.getDate();
    const dayOfWeek = currentDate.toLocaleString('default', { weekday: 'long' });
    const footerContent = `${dayOfWeek}, ${day} ${month} ${year}`;
    footerDate.textContent = footerContent;
  }

  // Call the function to update the footer date
  updateFooterDate();
});




window.addEventListener("scroll", function () {
  var header = document.getElementById("header");
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
// FOR INDEX.HTML 

// // JavaScript for the image slider
// const images = document.querySelectorAll('.image-gallery img');
// let currentIndex = 0;

// function showImage(index) {
//   images[currentIndex].style.opacity = 0;
//   currentIndex = index;
//   images[currentIndex].style.opacity = 1;
// }

// function nextImage() {
//   const newIndex = (currentIndex + 1) % images.length;
//   showImage(newIndex);
// }

// function prevImage() {
//   const newIndex = (currentIndex - 1 + images.length) % images.length;
//   showImage(newIndex);
// }

// // Auto-play the slider every 5 seconds
// setInterval(nextImage, 5000);

// // Event listeners for next and previous buttons (optional)

// // Show the first image initially
// showImage(currentIndex);const nextButton = document.getElementById('next-btn');
// const prevButton = document.getElementById('prev-btn');
// if (nextButton && prevButton) {
//   nextButton.addEventListener('click', nextImage);
//   prevButton.addEventListener('click', prevImage);
// }






