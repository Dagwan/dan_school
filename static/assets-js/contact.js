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



document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const submitButton = form.querySelector("button[type='submit']");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Disable the submit button while processing
    submitButton.disabled = true;

    // Create FormData object to collect form data
    const formData = new FormData(form);

    // Send the form data using AJAX
    fetch("/auth/contact", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Display success message or handle it on the thank you page
          console.log("Form submitted successfully");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        // Re-enable the submit button
        submitButton.disabled = false;
      });
  });
});
