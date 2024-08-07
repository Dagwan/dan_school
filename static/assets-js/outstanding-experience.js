
// JavaScript for creating the image slideshow
const images = ["/images/homepic.jpg", "/images/image2.jpg", "/images/image3.jpg"];
let currentImage = 0;
const welcomeImage = document.querySelector("#welcome img");

function changeImage() {
  welcomeImage.src = images[currentImage];
  currentImage = (currentImage + 1) % images.length;
}

// Change image every 3 seconds (3000ms)
setInterval(changeImage, 3000);



document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('#left-content .class-range a');

  for (const link of links) {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const href = this.getAttribute('href');
      const target = document.querySelector(href);

      if (target) {
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
        window.scroll({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }
});

const academicExcellenceItems = document.querySelectorAll('.learning-experience-design');
const modals = document.querySelectorAll('.modal');
const closeButton = document.querySelector('.close');
let currentIndex = 0;

// Function to show the modal with content based on the clicked item
function showModal(index) {
  modals[index].classList.add('active');
}

// Function to hide the modal
function hideModal() {
  modals[currentIndex].classList.remove('active');
}

// Event listeners for "Learn More" buttons
academicExcellenceItems.forEach((item, index) => {
  const learnMoreButton = item.querySelector('.pop-onlick');
  learnMoreButton.addEventListener('click', () => {
    currentIndex = index;
    showModal(index);
  });
});

// Event listener for closing the modal
closeButton.addEventListener('click', () => {
  hideModal();
});

// Event listener for close button inside modal
modals.forEach((modal) => {
  const modalClose = modal.querySelector('.close');
  modalClose.addEventListener('click', () => {
    hideModal();
  });
});


//video background 
const video = document.getElementById('video');
    const overlay = document.getElementById('overlay');
    const playPauseButton = document.getElementById('play-pause');
    const forwardButton = document.getElementById('forward');
    const closeButton1 = document.getElementById('close1');

    playPauseButton.addEventListener('click', () => {
      if (video.paused || video.ended) {
        video.play();
        playPauseButton.innerHTML = '&#10074;&#10074;';
      } else {
        video.pause();
        playPauseButton.innerHTML = '&#9658;';
      }
    });

    forwardButton.addEventListener('click', () => {
      video.currentTime += 30;
    });

    closeButton1.addEventListener('click', () => {
      video.pause();
      overlay.style.display = 'none';
    });

    video.addEventListener('play', () => {
      playPauseButton.innerHTML = '&#10074;&#10074;';
    });

    video.addEventListener('pause', () => {
      playPauseButton.innerHTML = '&#9658;';
    });

    video.addEventListener('ended', () => {
      playPauseButton.innerHTML = '&#9658;';
    });


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
  

  