import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateEventController {
  async handle(request: Request, response: Response) {
    try {
      const { name, date, description, categoryId, locationId } = request.body;

      if (!name || !date || !categoryId || !locationId) {
        return response
          .status(400)
          .json({ error: 'Mandatory fields not filled in' });
      }

      const eventDate = new Date(date);
      eventDate.setUTCHours(0, 0, 0, 0);

      const event = await prismaClient.event.create({
        include: {
          category: true,
          location: true,
        },
        data: {
          name,
          date: eventDate,
          description,
          categoryId,
          locationId,
        },
      });

      return response.status(201).json({
        ...event,
        categoryName: event.category.name,
        locationName: event.location.name,
      });
    } catch (error) {
      console.error('Error creating the Event:', error);
      return response
        .status(500)
        .json({ error: 'An error occurred while creating the Event' });
    }
  }
}
