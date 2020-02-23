import { QuestionsService, UpdateQuestionRequest } from '../services/questions.service';
import { observable, action } from 'mobx';
import { IQuestion, QuestionStatus } from '../interfaces';

import debounce from 'lodash/debounce';

export class QuestionsStore {

	private readonly api: QuestionsService;

	@observable
	public questions: IQuestion[];
	constructor(questionsService: QuestionsService) {
		this.api = questionsService;

		this.questions = [];
	}

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

	@action
	public async publish(question: IQuestion) {
		if (question.status === QuestionStatus.NEW) {
			return null;
		}

		if (!question.categories.length || !question.difficulties.length) {
			return null;
		}

		return await this.api.publish(question._id);
	}

	public calculateStatusString(status: QuestionStatus): string {
		const statuses = {
			[QuestionStatus.NEW]: 'New!',
			[QuestionStatus.REVIEWED]: 'Reviewed!',
			[QuestionStatus.PUBLISHED]: 'Published!',
		}
	return statuses[status] || 'New!';
}
	
	private getAll() {
		return this.api.getAll();
	}

	@action
	public search = debounce(async query => {
		const questions = await this.api.search(query);
		this.questions = questions;
	}, 300)

		
	private convertQuestionToUpdateObject = (question: IQuestion): UpdateQuestionRequest => {
		const categories = question.categories.map(category => category._id)
		const difficulties = question.difficulties.map(difficulty => difficulty._id)
		return {
			categories,
			difficulties
		}
	}

}