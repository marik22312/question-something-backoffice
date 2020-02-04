import { observable, action, computed } from 'mobx';
import { IdentityServiceInterface, TryLogigArgs, LoginSuccessResponse } from '../services/identity.service';
import { setToken } from '../services/http.client';
import { AxiosError } from 'axios';
import { GoogleLoginResponse } from 'react-google-login';
import { IUser } from '../interfaces';

export default class IdentityStore {
	private identityService: IdentityServiceInterface;

	@observable public token: string | null;
	@observable public user: IUser | null ;

	constructor(identityService: IdentityServiceInterface) {
		this.identityService = identityService;
		console.log('CNSTRCTR', this.identityService)

		const authObj = this.identityService.getTokenFromStorage();
		this.token = authObj?.token || null
		this.user = authObj?.user || null

		if (this.token) {
			this.setToken(this.token);
			// this.getUser();
		}
	}

	@computed public get isLoggedIn() {
		return !!this.token;
	}

	@action
	public async preformLogin(credentials: TryLogigArgs): Promise<void> {
		try {
			const {data} = await this.identityService.preformLogin(credentials);
			this.onLoginSuccess(data)
		} catch (e) {
			console.error(e);
		}
	}

	@action async googleAuth(creds: GoogleLoginResponse) {
		const response = await this.identityService.onGoogleLogin(creds);

		await this.onLoginSuccess(response);
		return;
	}

	@action
	private async onLoginSuccess(data: LoginSuccessResponse) {
		this.token = data.token;
		this.user = data.user;
		this.identityService.setTokenToStorage(data);
		setToken(this.token);
	}

	@action
	public async getUser(): Promise<void> {
		if (this.token) {
			try {
				const { data } = await this.identityService.getUser(this.token);
				this.user = data;
			} catch (e) {
				if (e.response.status === 401) {
					this.logout();
				}
			}
		} else {
			this.logout();
		}
	}

	public setToken(token: string) {
		return setToken(token);
	}
	
	@action
	public async logout() {
		console.log('LOGOUT!', this.identityService)
		this.identityService.logout();
		this.token = null;
		this.user = null;
		this.setToken('');
	}
}