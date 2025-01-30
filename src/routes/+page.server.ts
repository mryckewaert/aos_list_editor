import { fail, redirect } from '@sveltejs/kit';
import {
	validateSessionToken,
	setSessionTokenCookie,
	invalidateSession,
	deleteSessionTokenCookie
} from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}

	const token = event.cookies.get('session') ?? null;
	if (token === null) {
		return new Response(null, {
			status: 401
		});
	}

	const { session, user } = await validateSessionToken(token);
	if (session === null) {
		deleteSessionTokenCookie(event);
		return new Response(null, {
			status: 401
		});
	}
	setSessionTokenCookie(event, token, session.expiresAt);

	return {
		userName: user.name
	};
};

export const actions: Actions = {
	default: async (event) => {
		if (event.locals.session === null) {
			return fail(401);
		}
		await invalidateSession(event.locals.session.id);
		deleteSessionTokenCookie(event);
		return redirect(302, '/login');
	}
};
