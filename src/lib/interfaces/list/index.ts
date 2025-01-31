export interface CreateListInfo {
	name: string;
	limit: string;
	factionId: string;
	userId: string;
}

export interface UpdateListInfo {
	name: string | null;
	limit: string | null;
	factionId: string | null;
}
