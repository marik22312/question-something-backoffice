import IdentityService, { IdentityServiceInterface } from './identity.service';
import { axiosMock } from '../../__tests__/mocks/axios.mock';
import { BASE_URL } from '../config';
import { CookieOven } from './CookieOven';




describe('Identity Service', () => {
	jest.mock('./CookieOven.ts');
	let identityService: IdentityServiceInterface;
	let cookieOven = new CookieOven();
	beforeEach(() => {
		identityService = new IdentityService(axiosMock, cookieOven);
	});

	describe('Preform Login', () => {
		it ('Should Preform POST request to BASE_API + /login', async () => {
			const credentials = {
				email: 'someEmail@radiosavta.com',
				password: 'test1234'
			};
	
			await identityService.preformLogin(credentials);
	
			expect(axiosMock.post).toBeCalledWith(
				BASE_URL + "/login",
				credentials,
				undefined
			);
		})
	})

})