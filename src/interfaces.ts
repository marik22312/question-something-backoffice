export interface IDifficulty {
	_id: string;
	key: string;
}

export interface ICategory {
	_id: string;
	key: string;
	difficulties: IDifficulty[];
	icon: string;
}

export enum QuestionStatus {
	NEW = 'NEW',
	REVIEWED = 'REVIEWED',
	PUBLISHED = 'PUBLISHED'
}

export interface IQuestion {
	_id: string;
	question: string;
	no_of_likes: number;
	no_of_dislikes: number;
	categories: ICategory[];
	difficulties: IDifficulty[];
	status?: QuestionStatus; // TODO: remove optionallity
}

export interface IUser {
	_id: string;
	email: string;
}
