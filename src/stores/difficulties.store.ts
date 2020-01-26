import { DifficultiesService } from '../services/difficulties.service';
import { observable, action } from 'mobx';
import { IDifficulty } from '../interfaces';

export class DifficultiesStore {

	private readonly api: DifficultiesService;
	public difficulties: IDifficulty[];
	constructor(difficultiesService: DifficultiesService) {
		this.api = difficultiesService;

		this.difficulties = [];
	}

	@observable

	@action
	public async init() {
		const { data } = await this.getAll();
		this.difficulties = data.difficulties;
		return;
	}

	private getAll() {
		return this.api.getAll();
	}
}