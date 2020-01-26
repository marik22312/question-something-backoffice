import * as React from "react";
import { Container, Row, Col, Alert } from "reactstrap";
import { LoginForm, LoginObject } from "../../views/Login/Login.component";
import { BaseApiService } from "../../services/base.api.service";
import { GoogleLoginResponse } from "react-google-login";
import { CookieOven } from "../../services/CookieOven";
import { RouteComponentProps } from "react-router-dom";
import { inject, observer } from "mobx-react";
import IdentityStore from "../../stores/identity.store";

interface Props extends RouteComponentProps {
	identityStore: IdentityStore;
}

interface State {
	isLoading: boolean;
	error: null | string;
}

@inject("identityStore")
@observer
export class LoginPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			isLoading: false,
			error: null
		};
	}

	private onGoogleLogin = async (creds: GoogleLoginResponse) => {
		this.setState({ isLoading: true, error: null });
		try {
			await this.props.identityStore.googleAuth(creds);
			this.props.history.push("/");
		} catch (error) {
			this.setState({
				isLoading: false,
				error: error.response.data
			});
		}
	};

	private login = async (creds: LoginObject) => {
		this.setState({ isLoading: true });
	};

	render() {
		return (
			<React.Fragment>
				<Container>
					<Row className="main-container">
						<Col xs={3} className="main-view d-flex justify-content-center">
							<LoginForm
								isLoading={this.state.isLoading}
								onSubmit={this.login}
								onGoogleLogin={this.onGoogleLogin}
							/>
							{this.state.error && (
								<Alert color="danger">{this.state.error}</Alert>
							)}
						</Col>
					</Row>
				</Container>
			</React.Fragment>
		);
	}
}
