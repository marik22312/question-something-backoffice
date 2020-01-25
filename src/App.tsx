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
import Axios from "axios";

import "./App.scss";
import { BASE_URL } from "./config";
import { ICategory, IQuestion } from "./interfaces";

interface State {
  isLoading: boolean;
  auth: null | string;
  activeTab: string;
  categories: ICategory[];
  questions: IQuestion[];
  error: any;
}
export class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false,
      auth: null,
      activeTab: "1",
      categories: [],
      questions: [],
      error: null
    };
  }

  private login = async (creds: LoginObject) => {
    this.setState({ isLoading: true });
    try {
      const { data } = await Axios.post(BASE_URL + "/authenticate", creds);
      this.setState({
        auth: data.token
      });
      await this.fetchData(data.token);
    } catch (error) {
      this.setState({
        isLoading: false,
        error: error
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
      isLoading: false
    });
  }

  private fetchQuestions = async () => {
    return Axios.get(BASE_URL + "/api/questions");
  };
  private fetchCategories = async () => {
    return Axios.get(BASE_URL + "/api/categories");
  };
  private fetchDifficulties = async () => {
    return Axios.get(BASE_URL + "/api/difficulties");
  };

  private onGoogleLogin = async (creds: GoogleLoginResponse) => {
    this.setState({ isLoading: true, error: null });
    try {
      const { data } = await Axios.post(BASE_URL + "/google", creds.getAuthResponse());
      this.setState({
        auth: data.token
      });
      await this.fetchData(data.token);
    } catch (error) {
      this.setState({
        isLoading: false,
        error: error.response.data
      });
    }
  };

  render() {
    return (
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
			{this.state.error && <Alert color="danger">{this.state.error}</Alert>}
          </Col>
        </Row>
      </Container>
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
