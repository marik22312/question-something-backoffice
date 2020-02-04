import { CategoriesService } from '../services/categories.service';
import { observable, action } from 'mobx';
import { ICategory } from '../interfaces';

export class CategoriesStore {

	private readonly api: CategoriesService;
	public categories: ICategory[];
	constructor(categoriesService: CategoriesService) {
		this.api = categoriesService;

		this.categories = [];
	}


	@action
	public async init() {
		const { data } = await this.api.getAll();
		this.categories = data.categories;
		return;
	}

	@action
	public async create(category: ICategory): Promise<ICategory> {
		const { data } = await this.api.create(category);
		await this.init();
		return data;
	}

}