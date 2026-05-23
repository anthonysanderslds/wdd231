const today = new Date();
const currentYearElement = document.getElementById("currentYear");
currentYearElement.textContent = today.getFullYear();
document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;

const navButton = document.querySelector('#ham-btn');
const navLinks = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('open');
    navLinks.classList.toggle('open');
});

//target html elements
const currentTemp = document.querySelector('#current-weather');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-desc');
const tempMin = document.querySelector('#temp-min');
const tempMax = document.querySelector('#temp-max');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const weatherForecast = document.querySelector('#weather-forecast');
const spotlights = document.querySelector('#spotlights');

//api urls for current weather and forecast
const currentUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=45.32&lon=-92.70&units=imperial&appid=05501636229f69f616d6457f0f5b6290';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=45.32&lon=-92.70&units=imperial&appid=05501636229f69f616d6457f0f5b6290';

//api call for current weather
async function apiFetchCurrent() {
    try {
        const response = await fetch(currentUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

//api call for forecast
async function apiFetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayWeatherForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

//call both api fetch functions
apiFetchCurrent();
apiFetchForecast();
fetchSpotlights();

//display current weather data
function displayCurrentWeather(data) {
    currentTemp.innerHTML = `<b>${Math.round(data.main.temp)}</b>&deg;F`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const desc = data.weather[0].main;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.innerHTML = desc;

    //set up high, low, and humidity
    tempMax.innerHTML = `High: ${Math.round(data.main.temp_max)}&deg;F`;
    tempMin.innerHTML = `Low: ${Math.round(data.main.temp_min)}&deg;F`;
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`;

    //convert sunrise time
    const unixSunrise = data.sys.sunrise;
    const sunriseDate = new Date(unixSunrise * 1000);
    sunrise.innerHTML = `Sunrise: ${sunriseDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })}`;

    //convert sunset time
    const unixSunset = data.sys.sunset;
    const sunsetDate = new Date(unixSunset * 1000);
    sunset.innerHTML = `Sunset: ${sunsetDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })}`;
}

//display forecast data
function displayWeatherForecast(data) {
    // Filter for noon entries to get one reading per day
    const threeDayForecast = data.list.filter(item => {
        return item.dt_txt.includes('12:00:00');
    }).slice(0, 3);

    weatherForecast.innerHTML = '';

    threeDayForecast.forEach(day => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(day.main.temp);
        const icon = `openweathermap.org/img/wn/${day.weather[0].icon}.png`;
        const desc = day.weather[0].description;

        const card = document.createElement('div');
        card.classList.add('forecast-card');
        card.innerHTML = `
            <p>${dayName}</p>
            <p><b>${temp}</b>&deg;F</p>
        `;
        weatherForecast.appendChild(card);
    });
}

function displayRandomMembers(selectedMembers) {
    spotlights.innerHTML = '';

    selectedMembers.forEach(member => {
        const sCard = document.createElement('div');
        sCard.classList.add('spotlight-card');
        let cardBusinessName = document.createElement('h2');
        let cardLogo = document.createElement('img');
        let cardTagLine = document.createElement('p');
        let cardEmail = document.createElement('p');
        let cardPhone = document.createElement('p');
        let cardAddress = document.createElement('p');
        let cardUrl = document.createElement('a');
        let membershipLevel = document.createElement('span');

        cardBusinessName.textContent = member.name;
        cardLogo.setAttribute('src', member.image);
        cardLogo.setAttribute('alt', `${member.name} company logo`);
        cardLogo.setAttribute('loading', 'lazy')
        cardTagLine.textContent = member.tagLine;
        cardTagLine.classList.add('tagLine');
        cardEmail.innerHTML = `<b>EMAIL: </b>${member.email}`;
        cardPhone.innerHTML = `<b>PHONE: </b>${member.phone}`;
        cardAddress.innerHTML = `<b>ADDRESS: </b>${member.address}`;
        cardUrl.setAttribute('href', member.website);
        cardUrl.setAttribute("target", "_blank");
        cardUrl.setAttribute("rel", "noopener noreferrer");
        cardUrl.textContent = 'Visit Site';
        membershipLevel.classList.add("membership-level", getMembershipClass(member.membershipLevel));
        membershipLevel.textContent = getMembershipLevel(member.membershipLevel);


        sCard.appendChild(cardBusinessName);
        sCard.appendChild(cardTagLine);
        sCard.appendChild(cardLogo);
        sCard.appendChild(cardEmail);
        sCard.appendChild(cardPhone);
        sCard.appendChild(cardAddress);
        sCard.appendChild(cardUrl);
        sCard.appendChild(membershipLevel);

        spotlights.append(sCard);
    });
}

async function fetchSpotlights() {
    try {
        const response = await fetch("data/members.json");
        if (response.ok) {
            const members = await response.json();
            const filteredMembers = members.filter(member => member.membershipLevel === 3 || member.membershipLevel === 2);
            const randomMembers = filteredMembers.sort(() => 0.5 - Math.random());
            const selectedMembers = randomMembers.slice(0, 3);
            displayRandomMembers(selectedMembers);
        } else {
            throw Error("Error in fetching member data");
        }
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

// Convert membership level number to text
function getMembershipLevel(level) {
    switch (level) {
        case 3: return "Gold";
        case 2: return "Silver";
        case 1: return "Member";
        default: return "Member";
    }
}

// Get CSS class for membership badge
function getMembershipClass(level) {
    switch (level) {
        case 3: return "membership-gold";
        case 2: return "membership-silver";
        case 1: return "membership-member";
        default: return "membership-member";
    }
}