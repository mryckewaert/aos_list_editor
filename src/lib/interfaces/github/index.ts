export type GitHubUser = {
	id: string;
	login: string;
	avatar_url: string;
	name: string;
};

export type GitHubEmail = {
	email: string;
	primary: boolean;
	verified: boolean;
	visibility: string | null;
};
