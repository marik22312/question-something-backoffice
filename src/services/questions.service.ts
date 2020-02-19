import { BaseApiService } from "./base.api.service";
import { AxiosInstance, AxiosResponse } from "axios";
import { IQuestion } from "../interfaces";

interface GetAllQuestionsResponse {
	questions: IQuestion[];
	nextCursor: number;
}

export interface GetQuestionByIdResponse {
	question: IQuestion;
}

export class QuestionsService extends BaseApiService {
	private readonly ENDPOINT: string;

	constructor(axios: AxiosInstance) {
		super(axios);

		this.ENDPOINT = "/api/questions";
	}

	public getAll(): Promise<AxiosResponse<GetAllQuestionsResponse>> {
		return this.get(this.getFullUrl("/"));
	}

	public async bulkCreate(questions: any[]): Promise<IQuestion[]> {
		const { data } = await this.post(this.getFullUrl("/bulk"), {
			questions
		});
		return data;
	}

	public async getById(questionId: string): Promise<GetQuestionByIdResponse> {
		const { data } = await this.get(this.getFullUrl(`/${questionId}`));
		return data;
	}

	private getFullUrl(path: string): string {
		return this.ENDPOINT + path;
	}

	public async update(question: IQuestion): Promise<GetQuestionByIdResponse> {
		const { data } = await this.put(this.getFullUrl(`/${question._id}`));
		return data;
	}
}
