
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


// Fetch current weather data using OpenWeatherMap API
function fetchWeatherData() {
  var apiKey = '60e235e16fea773d9638123ad7f4420b'; // Replace with your API key
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Abuja,NG&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.main && data.main.temp) {
        var temperature = data.main.temp;
        var weatherDescription = data.weather[0].description;

        // Update the weather information in your HTML
        document.getElementById('current-weather').textContent = `${temperature}°C ${weatherDescription}`;
      } else {
        console.error('Error fetching weather data:', data);
      }
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

// Fetch current time and update the HTML
function updateCurrentTime() {
  var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById('current-time').textContent = currentTime;
}

// Call the initMap function to set up the map
function initMap() {
  var location = { lat: 9.0820, lng: 8.6753 }; // Coordinates for Nigeria
  var mapOptions = {
    center: location,
    zoom: 6 // Adjust the zoom level as needed
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: 'Nigeria'
  });

  // Fetch weather data and update current time
  fetchWeatherData();
  updateCurrentTime();
}

// Call the initMap function on page load
initMap();







