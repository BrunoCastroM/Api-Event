import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteLocationController {
  async handle(request: Request, response: Response) {
    try {
      const locationId = request.params.id;

      // Verificando se existe o local
      const existingLocation = await prismaClient.location.findUnique({
        where: { id: locationId },
      });

      if (!existingLocation) {
        return response.status(404).json({ error: 'Location not found' });
      }

      // Deletando a localização
      await prismaClient.location.delete({
        where: { id: locationId },
      });

      return response
        .status(204)
        .json({ message: 'Location deleted successfully' });
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'An error occurred while deleting the location' });
    }
  }
}
