import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetCategoriesController {
  async handle(request: Request, response: Response) {
    try {
      const categoryId = request.params.id;

      // Se categoryId existir nos parâmetros da URL, irá buscar apenas uma categoria específica
      if (categoryId) {
        const getCategory = await prismaClient.category.findUnique({
          where: { id: categoryId },
        });

        if (!getCategory) {
          return response.status(404).json({ error: 'Category not found' });
        }

        return response.status(200).json(getCategory);
      }

      // Se não tiver categoryId (sem id), irá buscar todas as categorias
      const getCategories = await prismaClient.category.findMany();
      return response.status(200).json(getCategories);
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'An error occurred while getting categories' });
    }
  }
}
