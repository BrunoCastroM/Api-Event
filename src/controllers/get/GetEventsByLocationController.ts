import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetEventsByLocationController {
  async handle(request: Request, response: Response) {
    try {
      const locationName = request.params.name;

      // Buscando eventos por localização
      const eventsByLocation = await prismaClient.event.findMany({
        where: {
          location: {
            name: locationName,
          },
        },
        include: {
          category: true,
          location: true,
        },
      });

      if (!eventsByLocation || eventsByLocation.length === 0) {
        return response
          .status(404)
          .json({ error: 'No events found for the specified location' });
      }

      return response.status(200).json(eventsByLocation);
    } catch (error) {
      console.error('Error getting events by location:', error);
      return response
        .status(500)
        .json({ error: 'An error occurred while getting events by location' });
    }
  }
}
