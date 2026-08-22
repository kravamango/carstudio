import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: "postgresql://kravamango@localhost:5432/carstudio?schema=public" });
const prisma = new PrismaClient({ adapter });

export const createCar = async (req: Request, res: Response) => {
    try {
        const { title, description, brand, model, year, mileage, price, fuelType, transmission, color } = req.body;
        const userId = (req as any).user.userId;

        const car = await prisma.car.create({
            data: {
                title,
                description,
                brand,
                model,
                year,
                mileage,
                price,
                fuelType,
                transmission,
                color,
                userId
            }
        });

        res.status(201).json(car);
    } catch (error) {
        console.error('Create car error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getCars = async (req: Request, res: Response) => {
    try {
        const cars = await prisma.car.findMany({
            where: { status: 'active' },
            include: { user: true },
            orderBy: { createdAt: 'desc' }
        });

        res.json(cars);
    } catch (error) {
        console.error('Get cars error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getCar = async (req: Request, res: Response) => {
    try {
        const id = String(req.params.id);

        const car = await prisma.car.findUnique({
            where: { id },
            include: { user: true }
        });

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.json(car);
    } catch (error) {
        console.error('Get car error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
