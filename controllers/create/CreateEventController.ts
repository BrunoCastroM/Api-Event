import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateEventController {
  async handle(request: Request, response: Response) {
    try {
      const { name, date, description, categoryId, locationId } = request.body;

      // Verificando se categoryId ou locationId existem no banco de dados antes de ser criado o evento
      const category = await prismaClient.category.findUnique({ where: { id: categoryId } });
      const location = await prismaClient.location.findUnique({ where: { id: locationId } });

      if (!category || !location) {
        return response.status(404).json({ error: 'Category or location not found' });
      }

      // Cria o evento
      const event = await prismaClient.event.create({
        data: {
          name,
          date,
          description,
          category: { connect: { id: categoryId } },
          location: { connect: { id: locationId } },
        },
      });

      return response.status(201).json(event);
    } catch (error) {
      return response.status(500).json({ error: 'An error occurred while creating the event' });
    }
  }
}
