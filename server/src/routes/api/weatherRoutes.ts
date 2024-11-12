import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js'; 
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const cityName = req.body.cityName;
    WeatherService.getWeatherForCity(cityName).then((data) => {
      HistoryService.addCity(cityName);
    res.json(data);
    console.log(cityName, data);
  });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});


// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  HistoryService.getCities().then((data) => {
    return res.json(data);
  })
  .catch((error) => {
    res.status(500).json({ message: error });
  });
});

router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    HistoryService.deleteCity(req.params.id).then(() => {
      res.json({ message: 'City deleted' });
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});



export default router;



