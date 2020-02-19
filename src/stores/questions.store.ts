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
		const { data } = await this.getAll();
		this.questions = data.questions;
		return;
	}
	
	@action
	public getById(questionId: string) {
		return this.api.getById(questionId);
	}
	
	@action
	public async BulkCreate(questions: any[]) {
		return this.api.bulkCreate(questions);
	}
	
	private getAll() {
		return this.api.getAll();
	}

}