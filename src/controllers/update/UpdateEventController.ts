import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateEventController {
  async handle(request: Request, response: Response) {
    try {
      const eventId = request.params.id
      const { name, date, description, categoryId, locationId } = request.body;

      // Verificando se o evento existe
      const existingEvent = await prismaClient.event.findUnique({ where: { id: eventId } });

      if (!existingEvent) {
        return response.status(404).json({ error: 'Event not found' });
      }

      // Atualizando evento
      const updatedEvent = await prismaClient.event.update({
        where: { id: eventId },
        data: {
          name,
          date,
          description,
          category: { connect: { id: categoryId } },
          location: { connect: { id: locationId } },
        },
      });

      return response.status(200).json(updatedEvent);
    } catch (error) {
      return response.status(500).json({ error: 'An error occurred while updating the event' });
    }
  }
}
