import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class UpdateCategoryController {
  async handle(request: Request, response: Response) {
    try {
      const categoryId = request.params.id;
      const { name } = request.body;


      // Verificando se a categoria existe
      const existingCategory = await prismaClient.category.findUnique({ where: { id: categoryId } });

      if (!existingCategory) {
        return response.status(404).json({ error: 'Category not found' });
      }

      // Atualizando a categoria
      const updatedCategory = await prismaClient.category.update({
        where: { id: categoryId },
        data: {
          name,
        },
      });

      return response.status(200).json(updatedCategory);
    } catch (error) {
      return response.status(500).json({ error: 'An error occurred while updating the category' });
    }
  }
}
