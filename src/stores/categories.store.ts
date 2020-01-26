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

	@observable

	@action
	public async init() {
		console.log('INIT!');
		const { data } = await this.getAll();
		this.categories = data.categories;
		return;
	}

	private getAll() {
		return this.api.getAll();
	}

	public async create(category: ICategory) {
		const {data} = await this.api.create(category);
		console.log(data);
	}
}