import { Router, type Request, type Response } from 'express';
import { get } from 'http';
const router = Router();

import HistoryService from '../../service/historyService.js'; 
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/weather', async (req: Request, res: Response) => {
  const { city } = req.body;
  const weatherService = new WeatherService();
  const historyService = new HistoryService();
  const coordinates = await weatherService.fetchAndDestructureLocationData(city);
  const weatherData = await weatherService.fetchWeatherData(coordinates);
  await historyService.addCity(city);
  res.json(weatherData);
  // TODO: GET weather data from city name
  // TODO: save city to search history
});


// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  req;
  const historyService = new HistoryService();
  const cities = await historyService.getCities();
  res.json(cities);
});



// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const historyService = new HistoryService();
  await historyService.removeCity(id);
  res.json({ message: 'City removed from search history' });
});


export default router;
