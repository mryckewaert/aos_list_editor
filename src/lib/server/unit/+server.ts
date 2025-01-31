import { error } from '@sveltejs/kit';
import prisma from '../prisma';
import type { CreateUnitInfo, UpdateUnitInfo } from '$lib/interfaces/unit';

export async function getAllUnits() {
	try {
		return await prisma.unit.findMany();
	} catch {
		error(404, {
			message: 'Not found'
		});
	}
}

export async function getAllFactionUnits(factionId: string) {
	try {
		return await prisma.unit.findMany({ where: { factionId } });
	} catch {
		error(404, {
			message: 'Not found'
		});
	}
}

export async function getAllListUnits(listId: string) {
	try {
		return await prisma.unit.findMany({
			where: {
				listUnit: {
					some: { listId }
				}
			}
		});
	} catch {
		error(404, {
			message: 'Not found'
		});
	}
}

export async function createUnit(unit: CreateUnitInfo) {
	try {
		const { name, cost, keywords, joinBy, joinLimitation, factionId } = unit;

		return await prisma.unit.create({
			data: {
				name,
				cost,
				keywords,
				joinBy,
				joinLimitation,
				factionId
			}
		});
	} catch (e) {
		console.log(e);
		throw new Error('Something went wrong on unit create');
	}
}

export async function updateUnit(id: string, unit: UpdateUnitInfo) {
	try {
		const { name, cost, keywords, joinBy, joinLimitation } = unit;
		const newUnit = await prisma.unit.findUnique({ where: { id } });

		if (!newUnit) {
			throw new Error("Unit doesn't exist");
		}

		return await prisma.unit.update({
			where: { id },
			data: {
				name: name !== null ? name : undefined,
				cost: cost !== null ? cost : undefined,
				keywords: keywords !== null ? keywords : undefined,
				joinBy: joinBy !== null ? joinBy : undefined,
				joinLimitation: joinLimitation !== null ? joinLimitation : undefined
			}
		});
	} catch (e) {
		console.log(e);
		throw new Error('Something went wrong on unit update');
	}
}

export async function deleteUnit(id: string) {
	try {
		const newUnit = await prisma.unit.findUnique({ where: { id } });

		if (!newUnit) {
			throw new Error("Unit doesn't exist");
		}

		return await prisma.unit.delete({ where: { id } });
	} catch (e) {
		console.log(e);
		throw new Error('Something went wrong on unit delete');
	}
}
