// import { Request, Response } from 'express';
// import { prismaClient } from '../../database/prismaClient';

// export class GetLocationController {
//   async handle(_: Request, response: Response) {
//     try {
//       const getLocations = await prismaClient.location.findMany();

//       return response.status(200).json(getLocations);
//     } catch (error) {
//       return response.status(500).json({ error: 'An error occurred while getting locations' });
//     }
//   }
// }


import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetLocationsController {
  async handle(request: Request, response: Response) {
    try {
      const locationId = request.params.id;

      // Se locationId existir nos parâmetros da URL, irá buscar apenas o local específico
      if (locationId) {
        const getLocation = await prismaClient.location.findUnique({
          where: { id: locationId },
        });

        if (!getLocation) {
          return response.status(404).json({ error: 'Location not found' });
        }

        return response.status(200).json(getLocation);
      }

      // Se não tiver LocalId (sem id), irá buscar todas os locais
      const getLocations = await prismaClient.location.findMany();
      return response.status(200).json(getLocations);
    } catch (error) {
      console.error('Error getting locations:', error);
      return response.status(500).json({ error: 'An error occurred while getting locations' });
    }
  }
}