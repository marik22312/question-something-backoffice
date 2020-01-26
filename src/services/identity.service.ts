import { AxiosInstance, AxiosResponse } from "axios";
import { BaseApiService } from "./base.api.service";
import { CookieOven } from "./CookieOven";
import { GoogleLoginResponse } from 'react-google-login';
import { IUser } from '../interfaces';
import { AUTH_COOKIE_KEY } from '../config';

export interface TryLogigArgs {
	email: string;
	password: string;
}

export interface LoginSuccessResponse {
	token: string;
	user: IUser; // TODO: Add user interface
}
export interface IdentityServiceInterface {
	preformLogin: (
		credentials: TryLogigArgs
	) => Promise<AxiosResponse<LoginSuccessResponse>>;
	getUser: (token: string) => Promise<AxiosResponse<IUser>>;
	getTokenFromStorage: () => LoginSuccessResponse | null;
	setTokenToStorage: (user: any) => Promise<any>;
	logout: () => void;
	onGoogleLogin(creds: GoogleLoginResponse): Promise<LoginSuccessResponse>
}

export default class IdentityService extends BaseApiService
	implements IdentityServiceInterface {
	private cookieOven: CookieOven;

	constructor(axiosInstance: AxiosInstance, cookieOven: CookieOven) {
		super(axiosInstance);

		this.cookieOven = cookieOven;
	}

	public preformLogin(
		credentials: TryLogigArgs
	): Promise<AxiosResponse<LoginSuccessResponse>> {
		return this.post("/login", credentials);
	}

	public onGoogleLogin = async (creds: GoogleLoginResponse) => {
		try {
			const { data } = await this.post(
				"/google",
				creds.getAuthResponse()
			)
			return data;
		} catch (error) {
			throw error.response.data;
		}
	};

	public getTokenFromStorage(): LoginSuccessResponse | null {
		const user: LoginSuccessResponse = this.cookieOven.eatCookie(AUTH_COOKIE_KEY);
		if (!user) {
			return null
		}
		return user;
	}

	public async setTokenToStorage(data: LoginSuccessResponse): Promise<void> {
		return this.cookieOven.bakeCookie(AUTH_COOKIE_KEY, data, {
			maxAge: 60 * 24 * 14
		});
	}

	public getUser(token: string) {
		return this.get("/me");
	}

	public logout() {
		return this.cookieOven.clear(AUTH_COOKIE_KEY);
	}
}
