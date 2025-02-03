import type { CreateUnitInfo, Unit, UpdateUnitInfo } from '$lib/interfaces/unit';
import { getOneFaction } from '$lib/server/faction/+server';
import { createUnit, deleteUnit, getFactionUnits, updateUnit } from '$lib/server/unit/+server';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ params }) => {
	const factionId = params.id;

	const faction = await getOneFaction(factionId);

	let units: Unit[];

	try {
		units = await getFactionUnits(factionId);
	} catch (e) {
		units = [];
	}

	return {
		faction,
		units
	};
};

export const actions: Actions = {
	createUnit: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('unitName')?.toString();
		const keywords = data.get('unitKeywords')?.toString().split(';');
		const joinKeyword = data.get('joinKeywords')?.toString().split(';');
		const joinLimitation = data.get('joinLimitations')?.toString().split(';');
		const costString = data.get('unitCost')?.toString();
		const factionId = data.get('factionId')?.toString();
		let cost: number;

		if (name && keywords && joinKeyword && joinLimitation && costString && factionId) {
			cost = parseInt(costString);
			let unit: CreateUnitInfo = {
				name,
				cost,
				keywords,
				joinBy: joinKeyword,
				joinLimitation,
				factionId
			};
			createUnit(unit);
			return redirect(303, `/faction/${factionId}`);
		}
	},

	updateUnit: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('unitName')?.toString();
		const keywords = data.get('unitKeywords')?.toString().split(';');
		const joinKeyword = data.get('joinKeywords')?.toString().split(';');
		const joinLimitation = data.get('joinLimitations')?.toString().split(';');
		const costString = data.get('unitCost')?.toString();
		const factionId = data.get('factionId')?.toString();
		const unitId = data.get('unitId')?.toString();
		let cost: number;

		if (name && keywords && joinKeyword && joinLimitation && costString && unitId) {
			cost = parseInt(costString);
			let unit: UpdateUnitInfo = {
				name,
				cost,
				keywords,
				joinBy: joinKeyword,
				joinLimitation
			};
			updateUnit(unitId, unit);
			return redirect(303, `/faction/${factionId}`);
		}
	},

	deleteUnit: async ({ request }) => {
		const data = await request.formData();
		const unitId = data.get('unitId')?.toString();
		const factionId = data.get('factionId')?.toString();

		if (unitId && factionId) {
			deleteUnit(unitId);
			return redirect(303, `/faction/${factionId}`);
		}
	}
};
