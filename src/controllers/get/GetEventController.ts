import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetEventsController {
  async handle(request: Request, response: Response) {
    try {
      const eventId = request.params.id;

      // Se eventId existir nos parâmetros da URL, irá buscar apenas uma categoria específica
      if (eventId) {
        const getEvent = await prismaClient.event.findUnique({
          where: { id: eventId },
          include: {
            category: true,
            location: true,
          },
        });

        if (!getEvent) {
          return response.status(404).json({ error: 'Event not found' });
        }

        return response.status(200).json(getEvent);
      }

      // Se não tiver eventId (sem id), irá buscar todos os eventos
      const getEvents = await prismaClient.event.findMany({
        include: {
          category: true,
          location: true,
        },
      });
      return response.status(200).json(getEvents);
    } catch (error) {
      console.error('Error getting events:', error);
      return response
        .status(500)
        .json({ error: 'An error occurred while getting events' });
    }
  }
}
