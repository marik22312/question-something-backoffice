import React from "react";
import { Provider } from "mobx-react";

import "./App.scss";
import { BaseApiService } from "./services/base.api.service";
import axiosInstance from "./services/http.client";
import { CookieOven } from "./services/CookieOven";
import IdentityService from "./services/identity.service";
import IdentityStore from "./stores/identity.store";
import Routes from "./Routes";
import { QuestionsStore } from './stores/questions.store';
import { QuestionsService } from './services/questions.service';
import { CategoriesStore } from './stores/categories.store';
import { CategoriesService } from './services/categories.service';
import { DifficultiesService } from './services/difficulties.service';
import { DifficultiesStore } from './stores/difficulties.store';

interface State {}

const cookieOven = new CookieOven();
const identityService = new IdentityService(axiosInstance, cookieOven);
const questionsService = new QuestionsService(axiosInstance);
const categoriesService = new CategoriesService(axiosInstance);
const difficultiesService = new DifficultiesService(axiosInstance);

const stores = {
	identityStore: new IdentityStore(identityService),
	questionsStore: new QuestionsStore(questionsService),
	categoriesStore: new CategoriesStore(categoriesService),
	difficultiesStore: new DifficultiesStore(difficultiesService)
};
export class App extends React.Component<{}, State> {
	private readonly _http: BaseApiService;
	private readonly cookieOven: CookieOven;

	constructor(props: any) {
		super(props);

		this.state = {};
		this._http = new BaseApiService(axiosInstance);
		this.cookieOven = new CookieOven();
	}
	render() {
		return (
			<Provider {...stores}>
				<Routes />
			</Provider>
		);
	}
}

export default App;
