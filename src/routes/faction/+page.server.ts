import type { Faction } from '$lib/interfaces/faction';
import type { Unit } from '$lib/interfaces/unit';
import { createFaction, deleteFaction, getAllFactions } from '$lib/server/faction/+server';
import { getFactionUnits } from '$lib/server/unit/+server';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../$types';

export const load: PageServerLoad = async () => {
	let factions: Faction[];

	try {
		factions = await getAllFactions();
	} catch (e) {
		factions = [];
	}

	return {
		factions
	};
};

export const actions: Actions = {
	createFaction: async ({ request }) => {
		const data = await request.formData();
		const factionName = data.get('factionName')?.toString();

		if (factionName) {
			createFaction(factionName);
			return redirect(303, '/faction');
		}
	},

	deleteFaction: async ({ request }) => {
		const data = await request.formData();
		const factionId = data.get('factionId')?.toString();

		if (factionId) {
			deleteFaction(factionId);
			return redirect(303, '/faction');
		}
	}
};
