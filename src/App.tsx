import React from "react";
import { GoogleLoginResponse } from "react-google-login";

import { CreateCategoryForm } from "./views/CreateCategoryForm";
import { CreateQuestionForm } from "./views/CreateQuestionForm";
import { LoginForm, LoginObject } from "./views/Login/Login.component";

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
import { HeaderContainer } from './components/Header/Header.component';
import { BaseApiService } from './services/base.api.service';
import axiosInstance from './services/http.client';
import { CookieOven } from './services/CookieOven';

interface State {
  isLoading: boolean;
  auth: null | string;
  activeTab: string;
  categories: ICategory[];
  questions: IQuestion[];
  error: any;
  user: IUser | null;
}
export class App extends React.Component<{}, State> {
	private readonly _http: BaseApiService;
	private readonly cookieOven: CookieOven;

  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false,
      auth: null,
      activeTab: "1",
      categories: [],
      questions: [],
	  error: null,
	  user: null
	};
	this._http = new BaseApiService(axiosInstance)
	this.cookieOven = new CookieOven();
  }

  componentWillMount() {
	  const authCookie = this.cookieOven.eatCookie("ICBRKR_AUTH");
	  if (authCookie) {
			this.setLoginData(authCookie);
		}
  }

  private login = async (creds: LoginObject) => {
    this.setState({ isLoading: true });
    try {
      const { data } = await this._http.post("/authenticate", creds);
      this.setLoginData(data);
    } catch (error) {
      this.setState({
        isLoading: false,
        error: error.response.data
      });
    }
  };

  private async fetchData(token: string) {
    const data = await Promise.all([
      this.fetchDifficulties(),
      this.fetchCategories(),
      this.fetchQuestions()
    ]);

    const [difficulties, categories, questions] = data;

    this.setState({
      categories: categories.data.categories,
      questions: questions.data.questions,
	  isLoading: false,
	  error: false
    });
  }

  private fetchQuestions = async () => {
    return this._http.get("/api/questions");
  };
  private fetchCategories = async () => {
    return this._http.get("/api/categories");
  };
  private fetchDifficulties = async () => {
    return this._http.get("/api/difficulties");
  };

  private onGoogleLogin = async (creds: GoogleLoginResponse) => {
    this.setState({ isLoading: true, error: null });
    try {
      const { data } = await this._http.post("/google", creds.getAuthResponse());
      this.setLoginData(data);
    } catch (error) {
      this.setState({
        isLoading: false,
        error: error.response.data
      });
    }
  };

	private setLoginData = (data: any) => {
		this.setState({
			auth: data.token,
			user: data.user,
		});
		this.cookieOven.bakeCookie('ICBRKR_AUTH', data, {
			maxAge: 60 * 24 * 14
		});
		this.fetchData(data.token);
	}

  render() {
    return (
		<React.Fragment>
			{this.state.user && <HeaderContainer user={this.state.user} />}
			<Container>
				<Row className="main-container">
					<Col xs={8} className="main-view">
						{this.state.auth ? (
							<this.renderContent />
						) : (
							<LoginForm
								isLoading={this.state.isLoading}
								onSubmit={this.login}
								onGoogleLogin={this.onGoogleLogin}
							/>
						)}
						{this.state.error && (
							<Alert color="danger">{this.state.error}</Alert>
						)}
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
  }

  renderContent = () => {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink onClick={() => this.setState({ activeTab: "1" })}>
              Create Question
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => this.setState({ activeTab: "2" })}>
              Create Category
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <CreateQuestionForm
              questions={this.state.questions}
              isLoading={this.state.isLoading}
            />
          </TabPane>
          <TabPane tabId="2">
            <CreateCategoryForm
              categories={this.state.categories}
              isLoading={this.state.isLoading}
            />
          </TabPane>
        </TabContent>
      </div>
    );
  };
}

export default App;
