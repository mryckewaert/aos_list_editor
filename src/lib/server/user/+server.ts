import prisma from '../prisma';
import { error } from '@sveltejs/kit';

export async function getUserFromGitHubId(githubId: string) {
	try {
		return await prisma.user.findFirst({
			where: {
				githubId
			}
		});
	} catch {
		error(404, {
			message: 'Not found'
		});
	}
}

export async function createUser(githubId: string, name: string) {
	try {
		const isAdmin = false;

		return await prisma.user.create({
			data: {
				githubId,
				name,
				isAdmin
			}
		});
	} catch (e) {
		console.log(e);
		throw new Error('Something went wrong on create new user');
	}
}
