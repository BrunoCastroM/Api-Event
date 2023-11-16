import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteCategoryController {
  async handle(request: Request, response: Response) {
    try {
      const categoryId = request.params.id;

      // Verificando se a categoria existe
      const existingCategory = await prismaClient.category.findUnique({
        where: { id: categoryId },
      });

      if (!existingCategory) {
        return response.status(404).json({ error: 'Category not found' });
      }

      // Deletando a categoria
      await prismaClient.category.delete({
        where: { id: categoryId },
      });

      return response.status(204).json({ message: 'Category deleted successfully' });
    } catch (error) {
      return response.status(500).json({ error: 'An error occurred while deleting the category' });
    }
  }
}
