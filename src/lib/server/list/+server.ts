import { error } from '@sveltejs/kit';
import prisma from '../prisma';
import type { CreateListInfo, UpdateListInfo } from '$lib/interfaces/list';

export async function getAllLists() {
	try {
		return await prisma.list.findMany();
	} catch {
		error(404, {
			message: 'Not found'
		});
	}
}

export async function getAllUserList(userId: string) {
	try {
		return await prisma.list.findMany({ where: { userId } });
	} catch {
		error(404, {
			message: 'Not found'
		});
	}
}

export async function getOneList(id: string) {
	try {
		return await prisma.list.findUnique({ where: { id } });
	} catch {
		error(404, { message: 'Not found' });
	}
}

export async function createList(list: CreateListInfo) {
	try {
		const { name, limit, factionId, userId } = list;

		return await prisma.list.create({
			data: {
				name,
				limit,
				factionId,
				userId
			}
		});
	} catch (e) {
		console.log(e);
		throw new Error('Something went wrong on list create');
	}
}

export async function updateList(id: string, list: UpdateListInfo) {
	try {
		const { name, limit, factionId } = list;
		const newList = await prisma.list.findUnique({ where: { id } });

		if (!newList) {
			throw new Error("List doesn't exist");
		}

		return await prisma.list.update({
			where: { id },
			data: {
				name: name !== null ? name : undefined,
				limit: limit !== null ? limit : undefined,
				factionId: factionId !== null ? factionId : undefined
			}
		});
	} catch (e) {
		console.log(e);
		throw new Error('Something went wrong on list update');
	}
}

export async function deleteList(id: string) {
	try {
		const newList = await prisma.list.findUnique({ where: { id } });

		if (!newList) {
			throw new Error("List doesn't exist");
		}

		return await prisma.list.delete({ where: { id } });
	} catch (e) {
		console.log(e);
		throw new Error('Something went wrong on list delete');
	}
}
