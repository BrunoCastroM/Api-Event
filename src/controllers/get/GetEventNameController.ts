import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetEventNameController {
  async handle(request: Request, response: Response) {
    try {
      const eventName = request.params.eventName;

      const events = await prismaClient.event.findMany({
        where: {
          name: {
            contains: eventName,
            mode: 'insensitive',
          },
        },
        include: {
          category: true,
          location: true,
        },
      });

      if (!events || events.length === 0) {
        return response
          .status(404)
          .json({ error: 'No events found with that name' });
      }

      const formattedEvents = events.map((event) => ({
        ...event,
        categoryName: event.category.name,
        locationName: event.location.name,
      }));

      return response.status(200).json(formattedEvents);
    } catch (error) {
      console.error('Error finding the Event:', error);
      return response
        .status(500)
        .json({ error: 'An error occurred while finding the Event' });
    }
  }
}
