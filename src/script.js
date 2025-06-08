var apiKey = "393f567c48e84a79bc1130056250306";

$(document).ready(function(){
	//Check for location data in cookie
	checkCookie();
	//Event listener for location input
	$("#locationInput").on("input", function() {
		searchlocation();
	});
});

// function to Check if cookie exists, if not prompt for location
function checkCookie() {
	const locationID = getCookie("locationID");
	if (locationID) {
		console.log("Location ID found in cookie:", locationID);
		FetchWeatherData(locationID);
	} else {
		console.log("No location ID found in cookie, prompting for location.");
		promptForLocation();
	}
}

function setCookie(key, value) {
	// set cookie with key and value
	document.cookie = key + "=" + encodeURIComponent(value) + "; path=/; max-age=31536000"; // 1 year expiration
	console.log("Cookie set:", key, value);
	//refresh the page to load weather data
	location.reload();
}

function getCookie(key)
{
	// username=
	const prefix = key + "=";
	// retrieve cookies
	const cookiesDecoded = decodeURIComponent(document.cookie);
	// split cookies
	const cookiesArr = cookiesDecoded.split('; ');

	// find cookie
	for (let i = 0; i < cookiesArr.length; i++)
	{
		let cookie = cookiesArr[i];

		// skip spaces
		while (cookie.charAt(0) == ' ')
		{
			cookie = cookie.substring(1);
		}

		// grab specified cookie name
		if (cookie.indexOf(prefix) == 0)
		{
			return cookie.substring(prefix.length, cookie.length);
		}
	}

	//cookie not found
	return "";

}

function FetchWeatherData(locationID){
	fetch('https://api.weatherapi.com/v1/current.json?key='+apiKey+'&q=id:'+locationID+'&aqi=no')
        .then(response => response.json())
        .then(async data => {
        	var weather = data.current;
			var location = data.location;
			var weatherIconFilePath = await getWeatherIcon(weather.is_day, weather.condition.code);

			var weatherInfo = `
				<h1>Weather in ${location.name}, ${location.country}</h1>
				<img id='weatherIcon' src="${weatherIconFilePath}"/>
				<p>Temperature: ${weather.temp_c}°C</p>
				<p id='weatherCondition'>Condition: ${weather.condition.text}</p>
				<p>Humidity: ${weather.humidity}%</p>
				<p>Wind Speed: ${weather.wind_kph} kph</p>
			`;

			document.getElementById('daily').innerHTML = weatherInfo;
        })
        .catch(error => {
          console.error('Error retrieving weather data:', error);
        });
}

//function to find a related weather svg file based on code
async function getWeatherIcon(isDay, code) {
	try {
		const weatherTranslationResponse = await fetch('./weather_conditions.json');
		const weatherTranslation = await weatherTranslationResponse.json();

		const translation = weatherTranslation.find(item => item.code === code);
		if (!translation) {
			console.error('No translation found for code:', code);
			return null;
		}

		const iconFileNamesResponse = await fetch('./iconFileNames.json');
		const iconFileNames = await iconFileNamesResponse.json();

		const iconFileName = iconFileNames.find(file => file.includes(translation.icon));
		if (iconFileName) {
			const iconPath = `weatherIcons/${isDay ? 'day' : 'night'}/${iconFileName}`;
			console.log('Icon path:', iconPath);
			return iconPath;
		} else {
			console.error('Icon file not found for code:', translation.code);
			return null;
		}
	} catch (error) {
		console.error('Error retrieving weather icon or file names:', error);
		return null;
	}
}

function promptForLocation() {
	//show popup for location input
	document.getElementById("popup").style.display = "block";
}

//This function will query the api for location basecd on user input
function searchlocation() {
	//clear location suggestions
	document.getElementById("locationSuggestions").innerHTML = "";

	const locationInput = document.getElementById("locationInput").value;
	if (locationInput) {
		var queryString = `https://api.weatherapi.com/v1/search.json?key=`+apiKey+`&q=${encodeURIComponent(locationInput)}`;
		console.log("Searching for location with query:", queryString);
		fetch(queryString)
			.then(response => response.json())
			.then(data => {
				console.log("Location search results:", data);
				if (data.length > 0) {
					var suggestionsListHtmlString = "";
					data.forEach(element => {
						//create suggestion list with name, region and country using id as href
						suggestionsListHtmlString += `<a href="#" onclick="setCookie('locationID',${element.id})">${element.name}, ${element.region ? element.region + ', ' : ''}${element.country}</a>`;
					});
					document.getElementById("locationSuggestions").innerHTML = suggestionsListHtmlString;
					
				} else {
					console.log("error in location search: No results found.");
				}
			})
			.catch(error => {
				console.error('Error searching for location:', error);
			});
	}
}

//Function to update mood suggestions based off how weather made user feel
function updateMood(){
	var mood = document.getElementById("moodSelector").value;
	//var weatherCondition = document.getElementById("weatherCondition").value;
	//use mood to look up mood suggestions from JSON file
	fetch('./moodSuggestions.json')
		.then(response => response.json())
		.then(data => {
			var suggestions = data[mood];
			if (suggestions) {
				//add the suggestions to the moodSuggestions div
				var suggestionsHtmlString = `<h2>Suggestion for ${mood} mood:</h2><br><p>${suggestions}</p>`;
				console.log("Mood suggestions:", suggestionsHtmlString);
				document.getElementById("moodSuggestions").innerHTML = suggestionsHtmlString;

			} else {
				document.getElementById("moodSuggestions").innerHTML = "<p>No suggestions available for this mood.</p>";
				console.log("No suggestions available for this mood.");
			}
		})
		.catch(error => {
			console.error('Error retrieving mood suggestions:', error);
			document.getElementById("moodSuggestions").innerHTML = "<p>Error retrieving mood suggestions.</p>";
		});
}