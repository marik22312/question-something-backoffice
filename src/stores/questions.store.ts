import { QuestionsService, UpdateQuestionRequest } from '../services/questions.service';
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
	public update(question: IQuestion) {
		const updateDto = this.convertQuestionToUpdateObject(question);

		return this.api.update(question._id, updateDto);
	}
	
	@action
	public async BulkCreate(questions: any[]) {
		return this.api.bulkCreate(questions);
	}
	
	private getAll() {
		return this.api.getAll();
	}

		
	private convertQuestionToUpdateObject = (question: IQuestion): UpdateQuestionRequest => {
		const categories = question.categories.map(category => category._id)
		const difficulties = question.difficulties.map(difficulty => difficulty._id)
		return {
			categories,
			difficulties
		}
	}

}