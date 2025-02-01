export interface CreateUnitInfo {
	name: string;
	cost: number;
	keywords: string[];
	joinBy: string[];
	joinLimitation: string[];
	factionId: string;
}

export interface UpdateUnitInfo {
	name: string | null;
	cost: number | null;
	keywords: string[] | null;
	joinBy: string[] | null;
	joinLimitation: string[] | null;
}

export interface Unit {
	id: string;
	name: string;
	cost: number;
	keywords: string[];
	joinBy: string[];
	joinLimitation: string[];
}
