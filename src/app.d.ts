import type { User } from '$lib/interfaces/user';
import type { Session } from '$lib/interfaces/session';

declare global {
	namespace App {
		interface Locals {
			user: User | null;
			session: Session | null;
		}
	}
}

export {};
