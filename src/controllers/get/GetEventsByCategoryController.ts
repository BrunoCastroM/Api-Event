import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetEventsByCategoryController {
  async handle(request: Request, response: Response) {
    try {
      const categoryName = request.params.name;

      // Se categoryName existir nos parâmetros da URL, irá buscar eventos pela categoria específica
      if (categoryName) {
        const getEventsByCategory = await prismaClient.event.findMany({
          where: {
            category: {
              name: categoryName,
            },
          },
          include: {
            category: true,
            location: true,
          },
        });

        return response.status(200).json(getEventsByCategory);
      }

      return response.status(400).json({ error: 'Category name not provided' });
    } catch (error) {
      console.error('Error getting events by category name:', error);
      return response
        .status(500)
        .json({
          error: 'An error occurred while getting events by category name',
        });
    }
  }
}
