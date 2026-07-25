/**
 * Live weather lookup for Cliply. Uses three free, keyless, CORS-enabled
 * public APIs — no account, no API key to manage, no backend proxy needed:
 *  - ipwho.is to guess the visitor's location from their IP address
 *  - Open-Meteo (https://open-meteo.com) for the current conditions
 *  - Zippopotam.us (https://zippopotam.us) to resolve a US ZIP code to coordinates
 */

export interface WeatherLocation {
  lat: number;
  lon: number;
  label: string;
}

export interface WeatherNow {
  tempF: number;
  emoji: string;
  text: string;
}

// WMO weather codes, as returned by Open-Meteo's current_weather.weathercode
const WEATHER_CODES: Record<number, { emoji: string; text: string }> = {
  0: { emoji: "☀️", text: "clear sky" },
  1: { emoji: "🌤️", text: "mostly clear" },
  2: { emoji: "⛅", text: "partly cloudy" },
  3: { emoji: "☁️", text: "overcast" },
  45: { emoji: "🌫️", text: "foggy" },
  48: { emoji: "🌫️", text: "foggy" },
  51: { emoji: "🌦️", text: "light drizzle" },
  53: { emoji: "🌦️", text: "drizzle" },
  55: { emoji: "🌦️", text: "heavy drizzle" },
  61: { emoji: "🌧️", text: "light rain" },
  63: { emoji: "🌧️", text: "rain" },
  65: { emoji: "🌧️", text: "heavy rain" },
  71: { emoji: "❄️", text: "light snow" },
  73: { emoji: "❄️", text: "snow" },
  75: { emoji: "❄️", text: "heavy snow" },
  80: { emoji: "🌦️", text: "rain showers" },
  81: { emoji: "🌧️", text: "rain showers" },
  82: { emoji: "⛈️", text: "violent rain showers" },
  95: { emoji: "⛈️", text: "thunderstorms" },
  96: { emoji: "⛈️", text: "thunderstorms with hail" },
  99: { emoji: "⛈️", text: "severe thunderstorms" },
};

// Codes 0-2 ("clear" / "mostly clear" / "partly cloudy") look wrong with a sun
// emoji after dark — swap in night-appropriate icons using current_weather.is_day.
const NIGHT_OVERRIDES: Record<number, { emoji: string; text: string }> = {
  0: { emoji: "🌙", text: "clear" },
  1: { emoji: "🌙", text: "mostly clear" },
  2: { emoji: "☁️", text: "partly cloudy" },
};

function describeCode(code: number, isDay: boolean) {
  if (!isDay && code in NIGHT_OVERRIDES) return NIGHT_OVERRIDES[code];
  return WEATHER_CODES[code] ?? { emoji: "🌡️", text: "unusual weather" };
}

export async function fetchWeatherForCoords(lat: number, lon: number): Promise<WeatherNow> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather request failed");
  const data = await res.json();
  const cw = data.current_weather;
  if (!cw || typeof cw.temperature !== "number") throw new Error("No current weather in response");
  const { emoji, text } = describeCode(cw.weathercode, cw.is_day === 1);
  return { tempF: Math.round(cw.temperature), emoji, text };
}

export async function fetchLocationFromIP(): Promise<WeatherLocation> {
  const res = await fetch("https://ipwho.is/");
  if (!res.ok) throw new Error("IP lookup failed");
  const data = await res.json();
  if (!data.success || typeof data.latitude !== "number" || typeof data.longitude !== "number") {
    throw new Error("IP lookup failed");
  }
  const place = data.city || data.region || data.country;
  if (!place) throw new Error("IP lookup returned no location");
  const region = data.region_code || data.country_code;
  return {
    lat: data.latitude,
    lon: data.longitude,
    label: region && region !== place ? `${place}, ${region}` : place,
  };
}

export async function fetchLocationForZip(zip: string): Promise<WeatherLocation> {
  const res = await fetch(`https://api.zippopotam.us/us/${encodeURIComponent(zip)}`);
  if (!res.ok) throw new Error("Unknown ZIP code");
  const data = await res.json();
  const place = data.places?.[0];
  if (!place) throw new Error("Unknown ZIP code");
  return {
    lat: parseFloat(place.latitude),
    lon: parseFloat(place.longitude),
    label: `${place["place name"]}, ${place["state abbreviation"]}`,
  };
}
