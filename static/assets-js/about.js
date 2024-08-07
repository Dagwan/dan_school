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
  
  