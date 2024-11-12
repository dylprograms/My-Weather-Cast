import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';
// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

class HistoryService {
  private async read(){
    return await fs.readFile('db/db.json', {
      flag: 'r',
      encoding: 'utf8'
    }
    );
  }
  private async write(cities: City[]){
    return await fs.writeFile('db/db.json', JSON.stringify(cities, null, '\t'), {
    });
  }
  async getCities(){
    return await this.read().then((cities) => {
      let parsedCities: City[] = JSON.parse(cities);
      try{
      parsedCities = JSON.parse(cities);
      } catch (error){
        console.error(error);
      }
      return parsedCities;
    }
    );
  }

    async addCity(cityName: string){
      if (!cityName){
        throw new Error('City name is required');
      }
      const newCity: City = { name: cityName, id: uuidv4() };
      return this.getCities().then((cities) => {
        const cityExists = cities.some(city => city.name.toLowerCase() === cityName.toLowerCase());
        if (cityExists){
          throw new Error('City already exists in search history');
        }
        cities.push(newCity);
        return this.write(cities);
      }
      );
    }
    async deleteCity(id: string){
      const cities = await this.getCities();
      const updatedCities = cities.filter(city => city.id !== id);
      if (updatedCities.length === cities.length){
        throw new Error('City not found');
      }
      await this.write(updatedCities);
    }
  }
export default new HistoryService();

/*
  // Function to get the file path from the current module's URL
  private getFilePath(): string {
    const __filename = new URL(import.meta.url).pathname;
    const __dirname = path.dirname(__filename);
    return path.join(__dirname, '../data/searchHistory.json');
  }

  // Method to read from searchHistory.json file
  private async read(): Promise<string> {
    try {
      return await fs.readFile(this.filePath, 'utf8');
    } catch (error) {
      console.error('Error reading searchHistory.json:', error);
      throw new Error('Could not read search history');
    }
  }

  // Method to write the updated cities array to searchHistory.json
  private async write(cities: City[]): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2), 'utf8');
    } catch (error) {
      console.error('Error writing to searchHistory.json:', error);
      throw new Error('Could not write to search history');
    }
  }

  // Get all cities from searchHistory.json as an array of City objects
  async getCities(): Promise<City[]> {
    try {
      const data = await this.read();
      return JSON.parse(data);
    } catch (error) {
      return []; // Return an empty array if there's an error or the file doesn't exist
    }
  }

  // Add a city to searchHistory.json
  async addCity(cityName: string): Promise<void> {
    const cities = await this.getCities();
    
    // Check for duplicate cities
    if (cities.some(city => city.name.toLowerCase() === cityName.toLowerCase())) {
      throw new Error('City already exists in search history');
    }
    
    const newCity = new City(cityName, (cities.length + 1).toString());
    cities.push(newCity);
    await this.write(cities);
  }

  // Remove a city by its ID from searchHistory.json
  async removeCity(id: string): Promise<void> {
    const cities = await this.getCities();
    const updatedCities = cities.filter(city => city.id !== id);

    if (updatedCities.length === cities.length) {
      throw new Error('City not found');
    }

    await this.write(updatedCities);
  }
}

export default new HistoryService();

/*
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json fil


  private async read(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.fs.readFile(this.path.join(__dirname, '../data/searchHistory.json'), 'utf8', (err: any, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  write(cities: City[]) {
    return new Promise((resolve, reject) => {
      this.fs.writeFile(this.path.join(__dirname, '../data/searchHistory.json'), JSON.stringify(cities), 'utf8', (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve('Successfully wrote to searchHistory.json');
        }
      });
    });
  }
  // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async getCities()  {
    const data = await this.read();
    return JSON.parse(data);
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  async addCity(city: string) {
    const cities = await this.getCities();
    const newCity = new City(city, (cities.length + 1).toString());
    cities.push(newCity);
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
  async removeCity(id: string) {
    const cities = await this.getCities();
    const updatedCities = cities.filter((city: City) => city.id !== id);
    await this.write(updatedCities);
  }
}

// export default new HistoryService();
export default new HistoryService();

*/
