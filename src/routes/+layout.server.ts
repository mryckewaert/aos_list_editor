import {
	validateSessionToken,
	setSessionTokenCookie,
	deleteSessionTokenCookie
} from '$lib/server/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	if (event.locals.user) {
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
			userName: user.name,
			isAdmin: user.isAdmin
		};
	}
};
