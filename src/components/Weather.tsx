import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../styles/Weather.css'
import { Fade, Input, SlideFade } from "@chakra-ui/react";
import { Icon, MapPin, Sun, Cloud, CloudRain, CloudLightning, CloudSnow, CloudDrizzle, Info } from 'react-feather';
import { Box, Text } from '@chakra-ui/react'

const iconMap: { [key: string]: Icon } = {
  sun: Sun,
  cloud: Cloud,
  "cloud-rain": CloudRain,
  "cloud-lightning": CloudLightning,
  "cloud-snow": CloudSnow,
  "cloud-drizzle": CloudDrizzle
};

interface Forecast {
  high: number;
  low: number;
  feels_like: number;
  icon: string;
  date: Date;
  temperature: number;
}

interface CurrentWeather {
  city_name: String;
  icon: string;
  temperature: number;
  condition: String;
  high: String;
  low: String;
  feels_like: String;
}

interface WeatherProps {
  forecast?: Forecast[],
  currentWeather?: CurrentWeather,
  cacheKeyExists?: any
}

const Weather: React.FC<WeatherProps> = () => {
  const [address, setAddress] = useState('')
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | undefined>();
  const [forecast, setForecast] = useState<Forecast[] | undefined>();
  // const [cacheKeyExists, setCacheKeyExists] = useState<boolean>();
  const [iconName, setIconName] = useState<string>('cloud');
  const [units, setUnits] = useState('');
  const [hideChangeLocation, setHideChangeLocation] = useState(true);
  const IconComponent = iconMap[iconName]; // Get the corresponding icon component
  const [loading, setLoading] = useState(true);
  const [hideWeatherWidget, setHideWeatherWidget] = useState(false);

  const getWeatherData = useCallback(async({location, ip, unitsOverride}: {location?: string; ip?: string, unitsOverride?: string}) => {
    try {
      const params: URLSearchParams = new URLSearchParams();
      if (location) params.append('location', location);
      if (ip) params.append('ip', ip);
      if (unitsOverride) params.append('units', unitsOverride)

      const response = await fetch(`https://bmepodrfarrqpcbl57nma67aay0fabwk.lambda-url.us-east-2.on.aws/?${params.toString()}`)
      const json = await response.json()

      setAddress(json?.current_weather?.city_name)
      setCurrentWeather(json['current_weather']);
      setIconName(json.current_weather.icon);
      setUnits(json.units);
    } catch (error) {
      setHideWeatherWidget(true);
      console.log('weather', error)
    }
  }, []);

  const getWeatherDataRef = useRef(getWeatherData); // Create a ref to hold the function
  useEffect(() => {
    getWeatherDataRef.current = getWeatherData; // Update the ref on change
  }, [getWeatherData]);

  useEffect(() => {
    const getIpAddress = async () => {
      const response = await fetch('https://api.ipify.org?format=json')
      const data: {ip: string} = await response.json();
      return data.ip;
    }

    const fetchLocation = async () => {
      const ip = await getIpAddress();
      await getWeatherDataRef.current({ip: ip});
      setLoading(false);
    }

    fetchLocation()
  }, []);

  const showAddressInput = () => {
    setLoading(false);
    setForecast(undefined);
    setCurrentWeather(undefined);
  }

  const handleUnitChange = () => {
    setHideChangeLocation(true);
    getWeatherData({unitsOverride: units === 'imperial' ? 'metric' : 'imperial', location: address})
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setHideChangeLocation(true);
    getWeatherData({location: address});
  };

  const weatherWidget = () => {
    return (
      <Fade in={true} delay={3}>
        <div className="wrapper">
          <span className={`weather-container ${currentWeather ? "active" : ""}`}>
            <div className="weather-panel">
              <div className="weather-overlay"></div>
              <div className="date-info">
                <span className="day-number">{new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                <Box display={'flex'} alignItems={'center'}>
                  <MapPin className="city-icon" />
                  <Text isTruncated className="city">{currentWeather?.city_name}</Text>
                </Box>
                <Box
                  display={'flex'} gap={'1'} mt={'2'} fontSize={'xs'}
                >
                  <div className="value">High: {currentWeather?.high}°</div>
                  <span className="value">Low: {currentWeather?.low}°</span>
                </Box>
              </div>
              <Box className="weather-info" display={'flex'} flexDirection={'column'} alignItems={'end'}>
                <Box display={'flex'} alignItems={'center'}>
                  <IconComponent className="weather-icon" />
                  <Info onClick={() => setHideChangeLocation(!hideChangeLocation)} size={'20'} style={{marginLeft: '1.5em'}} />
                </Box>
                <h1 className="temperature">{currentWeather?.temperature}°<span>{ units === 'imperial' ? 'F' : 'C' }</span></h1>
                <Text isTruncated maxWidth={'125px'} className="weather-description">{currentWeather?.condition}</Text>
              </Box>
            </div>
            <div className={`details-panel ${forecast ? "active" : "hide"}`}>
              <div className="today-details">
                <div className="precipitation">
                  <span className="label">HIGH</span>
                  <span className="value">{currentWeather?.high}°</span>
                  <div className="clearfix"></div>
                </div>
                <div className="humidity">
                  <span className="label">LOW</span>
                  <span className="value">{currentWeather?.low}°</span>
                  <div className="clearfix"></div>
                </div>
                <div className="wind">
                  <span className="label">FEELS LIKE</span>
                  <span className="value">{currentWeather?.feels_like}°</span>
                  <div className="clearfix"></div>
                </div>
              </div>
              <div>
                <ul className="week-forecast">
                  {forecast?.map((day: any, index: any) => (
                    <li key={index}>
                      <i className="day-icon" data-feather={day.icon}></i>
                      <span className="day-label">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                      <span className="day-temp">{day.temperature}°F</span>
                    </li>
                  ))}
                  <div className="clearfix"></div>
                </ul>
              </div>
            </div>
          </span>
          <SlideFade style={{position: 'absolute', top: '-80px', width: '100%'}} in={!hideChangeLocation && !!currentWeather}>
              <Box
                className='location-selection'
                display={'flex'}
              >
                <button className="location-btn" onClick={() => showAddressInput()}>
                  <MapPin /><span>Change location</span>
                </button>
                <button className="unit-btn" onClick={() => handleUnitChange()}>
                  <span>C/F</span>
                </button>
              </Box>
          </SlideFade>
          <Box
            className={`address-input ${(!currentWeather && !loading) ? "active" : "hide"}`}
            id="addressInput"
          >
            <form onSubmit={handleSubmit}>
              <Input type="text" color="black" name="address" onChange={(e) => setAddress(e.target.value)} placeholder="Search by address, city, or zip code" />
              <button type="submit">Get Forecast</button>
            </form>
          </Box>
        </div>
      </Fade>
    );
  }

  return (
    hideWeatherWidget ? <>weather not enabled on localhost</> : weatherWidget()
  )
};

export default Weather;
