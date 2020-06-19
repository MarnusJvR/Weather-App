import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

// I created an account with openweather
// This is the dedicated key they created
const apiKey = {
  key: "cb12a137b8968ceeb9365801327b2b1d",
  base: "https://api.openweathermap.org/data/2.5/",
};

// 
function App() {
  // I know this prob not the correct way of doing this, but I started messing around with State Hook
  // https://reactjs.org/docs/hooks-state.html
  // Normally I would do something like this:
  // class Example extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     query: '',
//       weather: {},
  //   };
  // }
  // Now we use the useState hook. 
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  // this gets called on in the onKeyPress event within input
  // it is a constant set equal to an arrow function that takes a keypressdown as an input
  // evt is just a placeholder i could use a different name
  // evt just seems to be industry standard
  // evt.key actually returns the key value that was entered.
  // we call search even onKeyPress. if the key is enter we call the api
  const search = (evt) => {
    if (evt.key === "Enter") {
      // Now that we know enter was pressed we can call the API
      // we already set apiKey.base constant
      // Now we need to build the string based on the API requirements
      // query is the state that was set bound to the value of our input
      // we use metrics
      // we also saved the key in apiKey.key above
      fetch(`${apiKey.base}weather?q=${query}&units=metric&APPID=${apiKey.key}`)
      // first then consumes the response. here we parse res to from json
        .then((res) => res.json())
        .then((result) =>{   
              // remember we use react hooks, so we use setWeather to set weather state equal to value of result.
              // result is obviously the info sent by the API 
          setWeather(result);
          // just run a check to try and figure out the structure of the result object
          console.log(result);
          
        });
    }
  };

  // this const simply extracts month day and date from the getDate js function to display nicely
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    // we build the final string that gets sent back to display
    let finalDate = day + " " + date + " " + month + " " + year + " ";
    return finalDate;
  };
  return (
    // I use this class name to set the background image
    // background images are defined in the index.css
    // I have never used javascript in a classname before.
    // This is a very neat trick
    // I first run an if  to check if to check for typeof weather
    // if not undefined I then run a second check to see what the temp is
    // if hotter than 16 then we create the classname app warm that displays the sunny pic
    // if not we just set it to app cold that displays a chilly pic
    // the final else is for the original NOT EQUAL to undefined
    // in that case we set to class just to app. this actually doesn't matter cause there is no response
    // className app is the standard background pic
    <div className={
      (typeof weather.main != "undefined") 
      ? ((weather.main.temp > 16)
        ? 'app warm' 
        : 'app cold')
          : 'app'  }>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search....."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
            </div>
            {/* I again run if to check valid response */}
            {(typeof weather.main != "undefined") ? (
              <div>
          <div className="location-box">
            {/* Here we display the location pulled from the api */}
  <div className="location">{weather.name}, {weather.sys.country}</div>
  {/* here we call the date builder and we sent it the current date to expand */}
            <div className="date"> {dateBuilder(new Date())} </div>
            <div className="weather-box">
              {/* I round the temp output  */}
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
            {/* weather[0] is just spevifying we want the first item in the array. there is sometime multiple */}
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
          </div>
           ) : ('')}
      </main>
    </div>
  );
}

export default App;
