import * as React from "react";
import { FormikProps } from "formik";
// import * as Yup from "yup";

import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login";

import "./Login.component.scss";
import { GOOGLE_LOGIN_KEY } from "../../config";

export interface LoginObject {
	email: string;
	password: string;
}

interface LoginFormProps {
	isLoading: boolean;
	onSubmit(credentials: LoginObject): void;
	onGoogleLogin(creds: GoogleLoginResponse): void;
}

export class LoginForm extends React.Component<LoginFormProps, {}> {
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	public render() {
		// const initialValues: LoginObject = { email: "", password: "" };
		return (
			<section id="login">
				{/* <Formik
                 initialValues={initialValues}
                 onSubmit={this.onSubmit}
                 render={this.renderForm}
               /> */}
				<GoogleLogin
					onSuccess={e => {
						const response = e as GoogleLoginResponse;
						this.props.onGoogleLogin(response);
					}}
					onFailure={e => console.log("fail", e)}
					onRequest={() => console.log("req")}
					buttonText="Login With Google!"
					clientId={GOOGLE_LOGIN_KEY}
					cookiePolicy={"single_host_origin"}
					disabled={this.props.isLoading}
				/>
			</section>
		);
	}

	private onSubmit = (creds: LoginObject) => {
		this.props.onSubmit(creds);
	};

	private renderForm = (formikProps: FormikProps<LoginObject>) => {
		return (
			<Form>
				<FormGroup row>
					<Label inline={false} for="userEmail">
						Email
					</Label>
					<Input
						type="email"
						name="email"
						id="userEmail"
						placeholder="user@radiosavta.com"
						onChange={formikProps.handleChange}
					/>
				</FormGroup>
				<FormGroup row>
					<Label for="userPassword" sm={12}>
						Password
					</Label>
					<Input
						type="password"
						name="password"
						id="userPassword"
						placeholder="user@radiosavta.com"
						onChange={formikProps.handleChange}
					/>
				</FormGroup>
				<FormGroup row>
					<Button
						color={"primary"}
						onClick={formikProps.submitForm}
						disabled={this.props.isLoading}
					>
						Submit
					</Button>
				</FormGroup>
			</Form>
		);
	};
}
