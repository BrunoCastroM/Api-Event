import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteEventController {
  async handle(request: Request, response: Response) {
    try {
      const eventId = request.params.id;

      // Verificando se o evento existe
      const existingEvent = await prismaClient.event.findUnique({
        where: { id: eventId },
      });

      if (!existingEvent) {
        return response.status(404).json({ error: 'Event not found' });
      }

      // Deletando o evento
      await prismaClient.event.delete({
        where: { id: eventId },
      });

      return response.status(204).json({ message: 'Event deleted successfully' });
    } catch (error) {
      return response.status(500).json({ error: 'An error occurred while deleting the event' });
    }
  }
}
