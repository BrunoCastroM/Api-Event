import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateLocationController {
  async handle(request: Request, response: Response) {
    try {
      const locationId = request.params.id;
      const { name, address } = request.body;

      // Verificando se o local existe
      const existingLocation = await prismaClient.location.findUnique({
        where: { id: locationId },
      });

      if (!existingLocation) {
        return response.status(404).json({ error: 'Location not found' });
      }

      // Atualizando o local
      const updatedLocation = await prismaClient.location.update({
        where: { id: locationId },
        data: {
          name,
          address,
        },
      });

      return response.status(200).json(updatedLocation);
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'An error occurred while updating the location' });
    }
  }
}
