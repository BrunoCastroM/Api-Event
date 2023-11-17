import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Handler para criar um novo evento
export const criarEvento = async (req: Request, res: Response) => {
  try {
    const { name, date, description, categoryId, locationId } = req.body

    if (!name || !date || !categoryId || !locationId) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos" })
    }

    const eventDate = new Date(date)
    eventDate.setUTCHours(0, 0, 0, 0)

    const event = await prisma.event.create({
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
    })

    res.status(201).json({
      ...event,
      categoryName: event.category.name,
      locationName: event.location.name,
    })
  } catch (error) {
    console.error("Erro ao criar o Evento:", error)
    res.status(500).json({ error: "Erro ao criar o Evento" })
  }
}


