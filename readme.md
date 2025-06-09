# Moody Weather

Moody Weather is a web application that displays current weather information for a user-selected location and provides mood-based suggestions based on the weather and user input. The app uses the [WeatherAPI](https://www.weatherapi.com/) for real-time weather data and offers an interactive, user-friendly interface.

Link: https://www.moodyweather.com/

---

## Technologies Used

- **HTML5**: Provides the structure of the web page.
- **CSS3**: Used for styling the page (see `styles.css`).
- **JavaScript (ES6+)**: Handles all dynamic functionality, including API calls, DOM manipulation, and user interaction.
- **jQuery**: Simplifies DOM manipulation and event handling.
- **WeatherAPI**: Supplies current weather data and location search.
- **JSON**: Used for storing weather icon mappings and mood suggestions.

---

## Project Structure

```
Moody-Weather/
│
├── src/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── weather_conditions.json
│   ├── iconFileNames.json
│   ├── moodSuggestions.json
│   └── weatherIcons/
│       ├── day/
│       └── night/
└── README.md
```

---

## How It Works

### 1. Location Selection

- On first visit, users are prompted to enter their location via a popup.
- As the user types, the app queries the WeatherAPI for matching locations and displays clickable suggestions.
- When a location is selected, its ID is stored in a cookie for future visits.

### 2. Weather Display

- The app fetches current weather data for the selected location using the WeatherAPI.
- Weather details such as temperature, condition, humidity, and wind speed are displayed.
- A relevant weather icon is shown, determined by matching the weather condition code to a local SVG file.

### 3. Mood Suggestions

- Users can select how the weather makes them feel from a dropdown menu.
- Based on the selected mood, the app fetches and displays a suggestion from `moodSuggestions.json`.

---

## File Overview

- **index.html**: Main HTML file containing the structure of the app, including the popup for location input, weather display, and mood selector.
- **script.js**: Contains all JavaScript logic for:
  - Cookie management
  - Fetching and displaying weather data
  - Handling location search and suggestions
  - Displaying mood-based suggestions
- **weather_conditions.json**: Maps weather condition codes to icon names.
- **iconFileNames.json**: Lists available weather icon filenames.
- **moodSuggestions.json**: Contains mood-based suggestions.
- **weatherIcons/**: Contains SVG icons for different weather conditions, separated into `day` and `night` folders.

---

## Key Features

- **Persistent Location**: Remembers the user's chosen location using cookies.
- **Live Location Search**: Provides instant suggestions as the user types.
- **Dynamic Weather Icons**: Displays context-appropriate icons for day/night and weather condition.
- **Mood-Based Recommendations**: Offers suggestions tailored to the user's mood.

---

## Server Configuration

The entire app is hosted on an Azure static Web app with default configurations aside from pointing to the specific website source files, this was then paired with a Squarespace domain and a SSL certificate was automatically setup by Azure after providing a CNAME connection.

---

## Credits

- Weather data provided by [WeatherAPI](https://www.weatherapi.com/).
- Icons and mood suggestions are open-source.

---

Student ID: 33958764
