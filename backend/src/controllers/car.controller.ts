import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: "postgresql://kravamango@localhost:5432/carstudio?schema=public" });
const prisma = new PrismaClient({ adapter });

export const createCar = async (req: Request, res: Response) => {
    try {
        const { title, description, brand, model, year, mileage, price, fuelType, transmission, color, photos } = req.body;
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
                photos,
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
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        const { brand, model, minPrice, maxPrice, minYear, maxYear, search } = req.query;

        const where: any = { status: 'active' };

        if (brand) where.brand = brand as string;
        if (model) where.model = model as string;
        if (minPrice) where.price = { ...where.price, gte: Number(minPrice) };
        if (maxPrice) where.price = { ...where.price, lte: Number(maxPrice) };
        if (minYear) where.year = { ...where.year, gte: Number(minYear) };
        if (maxYear) where.year = { ...where.year, lte: Number(maxYear) };
        if (search) {
            where.OR = [
                { title: { contains: search as string, mode: 'insensitive' } },
                { brand: { contains: search as string, mode: 'insensitive' } },
                { model: { contains: search as string, mode: 'insensitive' } }
            ];
        }

        const cars = await prisma.car.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        phone: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit
        });

        const total = await prisma.car.count({ where });

        res.json({
            cars,
            total,
            page,
            totalPages: Math.ceil(total / limit)
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
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        phone: true
                    }
                }
            }
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

export const getUserCars = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;

        const cars = await prisma.car.findMany({
            where: { userId },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(cars);
    } catch (error) {
        console.error('Get user cars error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
export const updateCar = async (req: Request, res: Response) => {
    try {
        const id = String(req.params.id);
        const userId = (req as any).user.userId;
        const { title, description, brand, model, year, mileage, price, fuelType, transmission, color, photos } = req.body;

        const car = await prisma.car.findUnique({ where: { id } });

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        if (car.userId !== userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const updatedCar = await prisma.car.update({
            where: { id },
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
                photos
            }
        });

        res.json(updatedCar);
    } catch (error) {
        console.error('Update car error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const deleteCar = async (req: Request, res: Response) => {
    try {
        const id = String(req.params.id);
        const userId = (req as any).user.userId;

        const car = await prisma.car.findUnique({ where: { id } });

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        if (car.userId !== userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await prisma.car.delete({ where: { id } });

        res.json({ message: 'Car deleted' });
    } catch (error) {
        console.error('Delete car error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
