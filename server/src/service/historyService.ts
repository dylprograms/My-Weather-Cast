// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  fs = require('fs');
  path = require('path');

  read() {
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
  async getCities() {
    const cities = await this.read();
    return JSON.parse(cities);
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
