document.addEventListener("DOMContentLoaded", () => {
  // Code for early page
  const button = document.querySelector(".button-to-display");
  const contentWrapper = document.querySelector(".content-wrapper");

  // Code for image slideshow
  const images = ["/images/homepic.jpg", "/images/image2.jpg", "/images/image3.jpg"];
  let currentImage = 0;
  const welcomeImage = document.querySelector("#welcome img");

  function changeImage() {
    welcomeImage.src = images[currentImage];
    currentImage = (currentImage + 1) % images.length;
  }

  // Change image every 3 seconds (3000ms)
  setInterval(changeImage, 3000);

  // Code for content toggling
  const buttons = document.querySelectorAll('.toggle');
  const contentSections = document.querySelectorAll('.content');

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      contentSections.forEach(content => {
        content.style.display = 'none';
      });
      contentSections[index].style.display = 'block';
    });
  });

  // Display the first content section by default
  contentSections[0].style.display = 'block';
});


document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll(".toggle-button");
  buttons.forEach(button => {
    button.addEventListener("click", function() {
      const target = button.getAttribute("data-target");
      const content = document.querySelector("." + target);
      
      if (content) {
        // Hide all content first
        document.querySelectorAll(".content1").forEach(c => {
          c.style.display = "none";
        });
        // Display the target content
        content.style.display = "block";
      }
    });
  });
});

//video background for about page
const video = document.getElementById('video');
    const overlay = document.getElementById('overlay');
    const playPauseButton = document.getElementById('play-pause');
    const forwardButton = document.getElementById('forward');
    const closeButton = document.getElementById('close');

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

    closeButton.addEventListener('click', () => {
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


