import { QuestionsService } from '../services/questions.service';
import { observable, action } from 'mobx';
import { IQuestion } from '../interfaces';

export class QuestionsStore {

	private readonly api: QuestionsService;
	public questions: IQuestion[];
	constructor(questionsService: QuestionsService) {
		this.api = questionsService;

		this.questions = [];
	}

	@observable

	@action
	public async init() {
		console.log('INIT!');
		const { data } = await this.getAll();
		this.questions = data.questions;
		return;
	}

	private getAll() {
		return this.api.getAll();
	}
}