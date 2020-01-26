import { BaseApiService } from "./base.api.service";
import { AxiosInstance, AxiosResponse } from "axios";
import { ICategory } from "../interfaces";

interface GetAllCategoriesResponse {
	categories: ICategory[];
	nextCursor: number;
}

export class CategoriesService extends BaseApiService {
	private readonly ENDPOINT: string;

	constructor(axios: AxiosInstance) {
		super(axios);

		this.ENDPOINT = "/api/categories";
	}

	public getAll(): Promise<AxiosResponse<GetAllCategoriesResponse>> {
		return this.get(this.getFullUrl("/"));
	}

	private getFullUrl(path: string): string {
		return this.ENDPOINT + path;
	}

	public async create(category: ICategory): Promise<AxiosResponse<ICategory>> {
		return this.post(this.getFullUrl("/"), category);
	}
}
