import { error } from '@sveltejs/kit';
import prisma from '../prisma';
import { Prisma } from '@prisma/client';

export async function getOneListUnits(listId: string) {
	try {
		return await prisma.listUnits.findUnique({ where: { listId } });
	} catch {
		error(404, { message: 'Not found' });
	}
}

export async function createListUnits(listId: string, unitsOrder: Prisma.JsonArray[]) {
	try {
		const existingListUnits = await prisma.listUnits.findUnique({ where: { listId } });

		if (existingListUnits) {
			error(409, { message: 'ListUnits already exist' });
		}

		return await prisma.listUnits.create({
			data: {
				listId,
				unitsOrder
			}
		});
	} catch (e) {
		console.log(e);
		throw new Error('Something went wrong on listUnits create');
	}
}

export async function updateListUnits(listId: string, unitsOrder: Prisma.JsonArray[] | null) {
	try {
		const newListUnits = await prisma.listUnits.findUnique({ where: { listId } });

		if (!newListUnits) {
			throw new Error('ListUnits already exist');
		}

		return await prisma.listUnits.update({
			where: { listId },
			data: {
				unitsOrder: unitsOrder !== null ? unitsOrder : undefined
			}
		});
	} catch (e) {
		console.log(e);
		throw new Error('Something went wrong on listUnits update');
	}
}
