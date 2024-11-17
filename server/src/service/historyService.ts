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
        
     
        cities.push(newCity);
        return this.write(cities);
      }
      );
    }
    async deleteCity(id: string){
      if (!id){
        throw new Error('City ID is required');
      }
      return this.getCities().then((cities) => {
        const updatedCities = cities.filter((city) => city.id !== id);
        return this.write(updatedCities);
      }
    
      );
    }
  }
export default new HistoryService();

