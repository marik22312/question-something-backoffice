import { BaseApiService } from './base.api.service';
import { BASE_URL } from '../config';
import { axiosMock } from '../../__tests__/mocks/axios.mock';

describe('Base API Service', () => {
	
	let baseApiService: BaseApiService;
	beforeEach(() => {
		baseApiService = new BaseApiService(axiosMock);
	});

	it('Should preform GET request', async () => {
		const url = 'http://www.radiosavta.com/';
		await baseApiService.get(url);
		
		expect(axiosMock.get).toBeCalledWith(BASE_URL + url, undefined);
	})
	it('Should preform POST request', async () => {
		const url = 'http://www.radiosavta.com/';
		const data = {
			key: 'value'
		}
		await baseApiService.post(url, data);
		
		expect(axiosMock.post).toBeCalledWith(BASE_URL + url, data, undefined);
	})
	it('Should preform PUT request', async () => {
		const url = 'http://www.radiosavta.com/';
		const data = {
			key: 'value'
		}

		await baseApiService.put(url, data);
		
		expect(axiosMock.put).toBeCalledWith(BASE_URL + url, data, undefined);
	})
	it('Should preform DELETE request', async () => {
		const url = 'http://www.radiosavta.com/';

		await baseApiService.delete(url);
		
		expect(axiosMock.delete).toBeCalledWith(BASE_URL + url, undefined);
	})
})