
import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  tempF: number;
  humidity: number;
  icon: string;
  iconDescription: string;
  constructor(
    city: string,
    date: string,
    tempF: number,
    humidity: number,
    icon: string,
    iconDescription: string
  ) {
    this.city = city;
    this.date = date;
    this.tempF = tempF;
    this.humidity = humidity;
    this.icon = icon;
    this.iconDescription = iconDescription;
  }
}
// TODO: Complete the WeatherService class 

class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private cityName = '';
  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
  }
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  private async fetchLocationData(query: string): Promise<any> {
    try {
  if (!this.baseURL || !this.apiKey) {
    throw new Error('Weather API URL or key is missing');
  }
  const response: Coordinates[] = await fetch(query).then((res) => res.json());
  return response[0];
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw error;
    }
  }

  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private destructureLocationData(locationData: Coordinates): Coordinates {
    if (!locationData) {
      throw new Error('Location data is missing');
    }
    const { name, lat, lon, country, state } = locationData;
    const coordinates: Coordinates = { name, lat, lon, country, state };
    return coordinates;
  }

  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
 private buildGeocodeQuery() {
    const geoQuery = `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`;
    return geoQuery;
  }
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  private buildWeatherQuery(coordinates: Coordinates) {
    const query = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
    return query;
  } 
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  private async fetchAndDestructureLocationData(){
    return this.fetchLocationData(this.buildGeocodeQuery()).then((locationData) => {
      return this.destructureLocationData(locationData);
    }
    );
  }
  
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  private async fetchWeatherData(coordinates: Coordinates) {
  try {
    const response = await fetch(this.buildWeatherQuery(coordinates)).then((res) => res.json());
    const theWeather: Weather = this.parseCurrentWeather(response.list[0]);
    const weatherForcast: Weather[] = this.buildForecastArray(theWeather, response.list);
    return weatherForcast;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  private parseCurrentWeather(response: any) {
    const { dt_txt, main, weather } = response;
    const currentWeather = new Weather(this.cityName, dt_txt, main.temp, main.humidity, weather[0].icon, weather[0].description);
    return currentWeather;

  }
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
   const fiveDayForecast: Weather[] = [currentWeather];
   const breakDown = weatherData.filter((data: any) => data.dt_txt.includes('12:00:00'));
   for (const data of breakDown) {
     const { dt_txt, main, weather } = data;
     const forecast = new Weather(this.cityName, dt_txt, main.temp, main.humidity, weather[0].icon, weather[0].description);
     fiveDayForecast.push(forecast);
   }
    return fiveDayForecast;
  }

  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  async getWeatherForCity(city: string): Promise<Weather[] | undefined> {
    try {
      this.cityName = city;
      const coordinates = await this.fetchAndDestructureLocationData();
      
      if (coordinates) {
        const weather = await this.fetchWeatherData(coordinates);
        console.log(weather);
        return weather;

      } else {
        // Return undefined if coordinates are not available
        return undefined;

      }
    } catch (error) {
      console.error('Error getting weather data:', error);
      throw error;
    }
  }
}



export default new WeatherService();
