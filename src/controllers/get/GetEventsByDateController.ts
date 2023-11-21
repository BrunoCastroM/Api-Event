import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetEventsByDateController {
  async handle(request: Request, response: Response) {
    try {
      const { date } = request.params;
      const formattedDate = date;

      // Realizando a busca no banco de dados
      const events = await prismaClient.event.findMany({
        where: {
          date: new Date(formattedDate),
        },
        include: {
          category: true,
          location: true,
        },
      });

      return response.status(200).json(events);
    } catch (error) {
      console.error('Error getting events by date:', error);
      return response
        .status(500)
        .json({ error: 'An error occurred while getting events by date' });
    }
  }
}
