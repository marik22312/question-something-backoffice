import React from "react";
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
  TabPane
} from "reactstrap";
import Axios from "axios";

import "./App.scss";
import { BASE_URL } from "./config";

interface State {
  isLoading: boolean;
  auth: null | string;
  activeTab: string
}
export class App extends React.Component<{}, State> {
         constructor(props: any) {
           super(props);

           this.state = {
             isLoading: false,
			 auth: null,
			 activeTab: "1",
           };
         }

         private login = async (creds: LoginObject) => {
           this.setState({ isLoading: true });
           const { data } = await Axios.post(BASE_URL + "/authenticate", creds);
           this.setState({
             auth: data.token,
             isLoading: false
           });
         };

         render() {
           return (
             <Container>
               <Row className="main-container">
                 <Col xs={8} className="main-view">
                   {this.state.auth ? (
                     <this.renderContent />
                   ) : (
                     <LoginForm onSubmit={this.login} />
                   )}
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
					 <CreateQuestionForm />
				 </TabPane>
                 <TabPane tabId="2">
					 <CreateCategoryForm />
				 </TabPane>
               </TabContent>
             </div>
           );
         };
       }

export default App;
