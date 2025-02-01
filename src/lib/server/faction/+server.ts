import { error } from '@sveltejs/kit';
import prisma from '../prisma';

export async function getAllFactions() {
	try {
		return await prisma.faction.findMany();
	} catch {
		error(404, {
			message: 'Not found'
		});
	}
}

export async function getAllFactionsAndUnits() {
	try {
		return await prisma.faction.findMany({
			select: {
				units: true
			}
		});
	} catch {
		error(404, {
			message: 'Not found'
		});
	}
}

export async function getOneFaction(factionId: string) {
	try {
		return await prisma.faction.findUnique({ where: { id: factionId } });
	} catch {
		error(404, { message: 'Not found' });
	}
}

export async function getOneFactionByName(factionName: string) {
	try {
		return await prisma.faction.findUnique({ where: { name: factionName } });
	} catch {
		error(404, { message: 'Not found' });
	}
}

export async function createFaction(factionName: string) {
	try {
		return await prisma.faction.create({
			data: {
				name: factionName
			}
		});
	} catch (e) {
		console.log(e);
		throw new Error('Something went wrong on faction create');
	}
}

export async function updateFaction(factionId: string, factionName: string) {
	try {
		const newFaction = await prisma.faction.findUnique({ where: { id: factionId } });

		if (!newFaction) {
			throw new Error("Faction doesn't exist");
		}

		return await prisma.faction.update({
			where: { id: factionId },
			data: {
				name: factionName
			}
		});
	} catch (e) {
		console.log(e);
		throw new Error('Something went wrong on faction update');
	}
}

export async function deleteFaction(factionId: string) {
	try {
		const newFaction = await prisma.faction.findUnique({ where: { id: factionId } });

		if (!newFaction) {
			throw new Error("Faction doesn't exist");
		}

		return await prisma.faction.delete({ where: { id: factionId } });
	} catch (e) {
		console.log(e);
		throw new Error('Something went wrong on faction delete');
	}
}
