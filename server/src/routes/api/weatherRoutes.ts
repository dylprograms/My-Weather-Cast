import { Router, type Request, type Response } from 'express';
// import { get } from 'http';
const router = Router();

import HistoryService from '../../service/historyService.js'; 
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/weather', async (req: Request, res: Response) => {
  const { city } = req.body;
 
  const coordinates = await WeatherService.getWeatherForCity(city);
  res.json(coordinates);
  // TODO: GET weather data from city name 
  // TODO: save city to search history
});


// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  req.body.city = req.params.city;
  const cities = await HistoryService.getCities();
  res.json(cities);
});


export default router;



// * BONUS TODO: DELETE city from search history
/*router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const historyService = new HistoryService();
  await historyService.removeCity(id);
  res.json({ message: 'City removed from search history' });
});
*/