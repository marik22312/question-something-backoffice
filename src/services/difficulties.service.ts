import { BaseApiService } from "./base.api.service";
import { AxiosInstance, AxiosResponse } from "axios";
import { IDifficulty } from "../interfaces";

interface GetAllDifficultiesResponse {
	difficulties: IDifficulty[];
	nextCursor: number;
}

export class DifficultiesService extends BaseApiService {
	private readonly ENDPOINT: string;

	constructor(axios: AxiosInstance) {
		super(axios);

		this.ENDPOINT = "/api/difficulties";
	}

	public getAll(): Promise<AxiosResponse<GetAllDifficultiesResponse>> {
		return this.get(this.getFullUrl("/"));
	}

	private getFullUrl(path: string): string {
		return this.ENDPOINT + path;
	}
}
