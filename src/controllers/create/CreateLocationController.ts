import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateLocationController {
  async handle(request: Request, response: Response) {
    try {
      const { name, address } = request.body;

      // Cria o local
      const location = await prismaClient.location.create({
        data: {
          name,
          address,
        },
      });

      return response.status(201).json(location);
    } catch (error) {
      return response.status(500).json({ error: 'Error creating location' });
    }
  }
}
