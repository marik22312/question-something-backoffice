import { BaseApiService } from "./base.api.service";
import { AxiosInstance, AxiosResponse } from "axios";
import { IQuestion } from "../interfaces";

interface GetAllQuestionsResponse {
	questions: IQuestion[];
	nextCursor: number;
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

	private getFullUrl(path: string): string {
		return this.ENDPOINT + path;
	}
}
