import React from "react";
import { Provider } from "mobx-react";
import { LoginForm } from "./views/Login/Login.component";

import {
	Container,
	Row,
	Col,
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
	Alert
} from "reactstrap";

import "./App.scss";
import { BASE_URL } from "./config";
import { ICategory, IQuestion, IUser } from "./interfaces";
import { HeaderContainer } from "./components/Header/Header.component";
import { BaseApiService } from "./services/base.api.service";
import axiosInstance from "./services/http.client";
import { CookieOven } from "./services/CookieOven";
import IdentityService from "./services/identity.service";
import IdentityStore from "./stores/identity.store";
import Routes from "./Routes";
import { QuestionsStore } from './stores/questions.store';
import { QuestionsService } from './services/questions.service';

interface State {}

const cookieOven = new CookieOven();
const identityService = new IdentityService(axiosInstance, cookieOven);
const questionsService = new QuestionsService(axiosInstance)

const stores = {
	identityStore: new IdentityStore(identityService),
	questionsStore: new QuestionsStore(questionsService)
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
