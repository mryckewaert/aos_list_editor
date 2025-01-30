import {
	createSession,
	generateSessionToken,
	github,
	setSessionTokenCookie
} from '$lib/server/auth';
import { OAuth2RequestError } from 'arctic';
import { createUser, getUserFromGitHubId } from '$lib/server/user/+server';
import type { RequestEvent } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';
import type { GitHubUser, GitHubEmail } from '$lib/interfaces/github';
import type { User } from '$lib/interfaces/user';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');

	const storedState = event.cookies.get('github_oauth_state') ?? null;

	if (code === null || state === null || storedState === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await github.validateAuthorizationCode(code);
		const accessToken = tokens.accessToken();
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		const githubUser: GitHubUser = await githubUserResponse.json();
		const githubUserId = githubUser.id.toString();
		const githubUsername = githubUser.login;

		const existingUser = await getUserFromGitHubId(githubUserId).catch((e) => {
			if (e.status === 404) {
				return null;
			}
		});

		if (existingUser) {
			console.log('pass');
			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, existingUser.id);
			setSessionTokenCookie(event, sessionToken, session.expiresAt);
			return new Response(null, {
				status: 302,
				headers: {
					Location: '/'
				}
			});
		} else {
			// const githubEmailResponse = await fetch('https://api.github.com/user/emails', {
			// 	headers: {
			// 		Authorization: `Bearer ${accessToken}`
			// 	}
			// }).then(null, () => {
			// 	return null;
			// });
			// const githubEmail: GitHubEmail[] = await githubEmailResponse?.json();

			// console.log(githubEmail);
			// get the primary email
			// const primary = githubEmail.find((entry) => entry.primary);
			// if (primary) {
			const user = await createUser(githubUserId, githubUsername);
			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, user.id);
			setSessionTokenCookie(event, sessionToken, session.expiresAt);
			// }
		}

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		// Invalid code or client credentials
		if (e instanceof OAuth2RequestError) {
			console.log('hi', e);
			return new Response(null, {
				status: 400
			});
		}
		console.log(e);
		return new Response(null, {
			status: 500
		});
	}
}
