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

export interface IQuestion {
  question: string;
  no_of_likes: number;
  no_of_dislikes: number;
  categories: ICategory[];
  difficulties: IDifficulty[]
}